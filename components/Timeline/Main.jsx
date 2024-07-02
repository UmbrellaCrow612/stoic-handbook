import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Zeno of Citium (334-262 BC)" },
  },
  {
    id: "2",
    position: { x: 200, y: 100 },
    data: { label: "Cleanthes (331-232 BC)" },
  },
  {
    id: "3",
    position: { x: 400, y: 200 },
    data: { label: "Chrysippus (280-206 BC)" },
  },
  {
    id: "4",
    position: { x: 600, y: 300 },
    data: { label: "Seneca (4 BC-65 AD)" },
  },
  {
    id: "5",
    position: { x: 800, y: 400 },
    data: { label: "Epictetus (50-135 AD)" },
  },
  {
    id: "6",
    position: { x: 1000, y: 500 },
    data: { label: "Marcus Aurelius (121-180 AD)" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
];

const Main = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div className="w-full h-full max-h-[32rem]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Main;
