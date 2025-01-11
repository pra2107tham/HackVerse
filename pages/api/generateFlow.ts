import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { context } = req.body;

    if (!context) {
      return res.status(400).json({ error: "Context is required." });
    }

    try {
      const messages = [
        {
          role: "system",
          content: `
You are an assistant generating highly detailed, visually appealing React Flow diagrams for a roadmap.

The user provides the context for the roadmap, and your job is to break it into clear, phase-wise steps with visually structured nodes and edges. Use the following format:

Phases: Each phase represents a key stage in the roadmap. Ensure phases are organized sequentially and connected logically.
Nodes: Each node must have:
A unique ID (e.g., "1", "2").
A type (input/output/default).
A label describing its content concisely.
A position (x, y) to ensure proper vertical alignment and phase separation. Nodes within the same phase should be horizontally spaced for readability.
Edges: Each edge connects two nodes and must have:
A unique ID (e.g., "e1-2").
A source (ID of the starting node).
A target (ID of the connecting node).
Generate detailed nodes and edges for the following roadmap context:

"${context}"

Ensure the output uses this format:

{
  "nodes": [
    { "id": "1", "type": "input", "data": { "label": "Start" }, "position": { "x": 250, "y": 0 } },
    { "id": "2", "data": { "label": "Phase 1: Step 1" }, "position": { "x": 100, "y": 100 } },
    { "id": "3", "data": { "label": "Phase 1: Step 2" }, "position": { "x": 400, "y": 100 } },
    { "id": "4", "data": { "label": "Phase 2: Step 1" }, "position": { "x": 250, "y": 200 } },
    { "id": "5", "type": "output", "data": { "label": "End" }, "position": { "x": 250, "y": 300 } }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2" },
    { "id": "e2-3", "source": "2", "target": "3" },
    { "id": "e3-4", "source": "3", "target": "4" },
    { "id": "e4-5", "source": "4", "target": "5" }
  ]
}
Additional instructions:

Use descriptive labels to make each step clear. For example, avoid vague terms like "Step 1" and use actionable titles such as "Learn Basics of XYZ".
Separate each phase vertically, leaving ample space for clarity.
Add logical edges that guide the user through the roadmap, ensuring smooth transitions between phases.
Nodes within the same phase should have slight horizontal offsets to make them visually distinct but grouped.
Highlight any key milestones (e.g., "Complete Certification", "Launch Product") by using a different node type (e.g., "output").
Provide a visually well-structured output that can be directly passed to a React Flow renderer.`
        },
        {
          role: "user",
          content: `Generate nodes and edges based on this context: "${context}"`
        }
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
      });

      const flowData = JSON.parse(completion.choices[0].message.content.trim());
      return res.status(200).json(flowData);
    } catch (error) {
      console.error("Error generating flow data:", error);
      return res.status(500).json({ error: "Failed to generate flow data." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}