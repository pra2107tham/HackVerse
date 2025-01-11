import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

const FlowRenderer = () => {
  const [context, setContext] = useState("Software Developer Roadmap");
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const generateFlow = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generateFlow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flow data.");
      }

      const data = await response.json();
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    // alert(`Node clicked: ${node.data.label}`);
  };

  const handleEdgeClick = (event, edge) => {
    // alert(`Edge clicked: ${edge.id}`);
  };

  return (
    <div>
      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Enter the context for your flowchart..."
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={generateFlow} disabled={loading}>
        {loading ? "Generating..." : "Generate Flow"}
      </button>

      <div style={{ height: "500px", marginTop: "20px" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </ReactFlowProvider>
        )}
      </div>
    </div>
  );
};

export default FlowRenderer;
