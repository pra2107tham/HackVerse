from flask import Blueprint, request, jsonify
from database import db
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

career_advisor = Blueprint('career_advisor', __name__)

# Serialization and Deserialization Functions
def serialize_store(store):
    """Convert the store dictionary into a JSON-compatible format."""
    from langchain_core.messages import HumanMessage, AIMessage

    serialized_store = {}
    for session_id, chat_history in store.items():
        serialized_store[session_id] = [
            {"type": "human", "content": message.content}
            if isinstance(message, HumanMessage)
            else {"type": "ai", "content": message.content}
            for message in chat_history.messages
        ]
    return serialized_store


def deserialize_store(serialized_store):
    """Convert the JSON-compatible format back into ChatMessageHistory objects."""
    from langchain_core.messages import HumanMessage, AIMessage
    from langchain_community.chat_message_histories import ChatMessageHistory

    deserialized_store = {}
    for session_id, messages in serialized_store.items():
        chat_history = ChatMessageHistory()
        for message in messages:
            if message["type"] == "human":
                chat_history.add_message(HumanMessage(content=message["content"]))
            elif message["type"] == "ai":
                chat_history.add_message(AIMessage(content=message["content"]))
        deserialized_store[session_id] = chat_history
    return deserialized_store


def get_response_from_career_advisor(name, user_query):
    try:
        # Load environment variables
        load_dotenv()
        groq_api_key = os.getenv("GROQ_API_KEY")
        model = ChatGroq(model="Gemma2-9b-It", groq_api_key=groq_api_key)

        # Import necessary components
        from langchain_core.messages import HumanMessage
        from langchain_community.chat_message_histories import ChatMessageHistory
        from langchain_core.runnables.history import RunnableWithMessageHistory
        from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

        # Fetch user data from MongoDB
        user_data = db.users.find_one({"name": name})
        if not user_data:
            return "User not found."

        user_id = str(user_data.get("user_id"))

        # Deserialize the store from the database
        serialized_store = user_data.get("store", {})
        store = deserialize_store(serialized_store)

        # Function to retrieve session history
        def get_session_history(session_id: str):
            if session_id not in store:
                store[session_id] = ChatMessageHistory()
            return store[session_id]

        # Set up the model with session history
        with_message_history = RunnableWithMessageHistory(model, get_session_history)

        # Define the chat prompt
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", """
                You are a precise and goal-oriented career advisor. Your role is to analyze the user's situation and aspirations and guide them effectively toward determining a suitable career path.

                1. Introduce yourself briefly, stating your goal to ask structured questions to understand the user's career preferences, education, and goals.
                2. Proceed to ask the following initial questions *one at a time* to build a concise and clear profile:
                    a. What is your current level of education or job title? (e.g., high school student, graduate, professional).
                    b. What subjects, activities, or fields do you enjoy or feel passionate about?
                    c. Are there any specific industries, roles, or types of work you're particularly curious about or interested in?
                    d. What is your ultimate career goal, or what kind of achievements do you envision for yourself in the future?
                    e. Do you already possess any skills, certifications, or experiences relevant to your interests?
                3. Based on each answer, *move directly to the next relevant question without additional commentary.*
                4. Use follow-up questions to gather deeper insights, such as:
                    - Are you open to pursuing further education or certifications to meet your goals?
                    - Do you have specific companies or job roles in mind?
                    - What are your preferred locations or work settings (e.g., remote, urban areas)?
                5. Conclude the conversation by:
                    - Summarizing your understanding of their goals.
                    - Recommending *three specific and realistic career paths or job roles* based on their inputs.
                    - Suggesting actionable next steps to pursue the recommended paths.

                Remember:
                - Keep the interaction concise and to the point.
                - Avoid adding unnecessary commentary or opinions unless the user explicitly asks for advice.
                - Ensure the user leaves with a clear understanding of potential career options and actionable guidance.
                """),
                MessagesPlaceholder(variable_name="messages")
            ]
        )

        # Create the runnable chain with the prompt
        chain = prompt | model
        with_message_history = RunnableWithMessageHistory(chain, get_session_history)

        # Invoke the chain to get a response
        response = with_message_history.invoke(
            [HumanMessage(content=user_query)],
            config={"configurable": {"session_id": user_id}},
        )

        # Serialize the updated store
        serialized_store = serialize_store(store)

        # Update the database with the updated store
        db.users.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "store": serialized_store,  # Save serialized message content
                    "last_message": user_query
                }
            }
        )

        # Return only the response content (not the full history object)
        return response.content

    except Exception as e:
        return str(e)


@career_advisor.route('/chat', methods=['POST'])
def chat_with_career_advisor():
    try:
        # Extract name and query from the request
        name = request.json.get("name")
        user_query = request.json.get("user_query")

        # Get response from the career advisor
        response = get_response_from_career_advisor(name, user_query)
        return jsonify({"groq_response": response})

    except Exception as e:
        return jsonify({"error": str(e)})
