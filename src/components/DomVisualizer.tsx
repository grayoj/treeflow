import { useMemo, useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnNodesChange,
  applyNodeChanges,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDomStore } from '@/store/domStore';
import { CustomEdge } from './CustomEdge';

interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export default function DOMVisualizer() {
  const { domTree, updateDom } = useDomStore();
  const [maxDepth, setMaxDepth] = useState<number>(5);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);

  useEffect(() => {
    updateDom(maxDepth);
  }, [maxDepth, updateDom]);

  const getMemoryUsage = () => {
    const perf = window.performance as ExtendedPerformance;
    if (perf.memory) {
      const usedMB = perf.memory.usedJSHeapSize / 1024 / 1024;
      setMemoryUsage(usedMB);
    }
  };

  useEffect(() => {
    getMemoryUsage();
    const interval = setInterval(getMemoryUsage, 2000);
    return () => clearInterval(interval);
  }, []);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const generateGraph = (
      node: { id: string; tag: string; children?: { id: string; tag: string; children?: any[] }[] },
      depth: number = 0,
      x: number = 0,
      y: number = 0,
      parentId: string | null = null
    ) => {
      if (depth > maxDepth) return;

      const currentNode: Node = {
        id: node.id,
        data: { label: node.tag },
        position: { x, y },
        type: 'default',
        draggable: true,
      };
      nodes.push(currentNode);

      if (parentId) {
        edges.push({
          id: `${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          type: 'customEdge',
          animated: depth < 2,
        });
      }

      node.children?.forEach((child, index) => {
        generateGraph(child, depth + 1, x + 200, y + index * 120, node.id);
      });
    };

    generateGraph(domTree);
    return { initialNodes: nodes, initialEdges: edges };
  }, [domTree, maxDepth]);

  const [nodesState, setNodesState] = useState<Node[]>(initialNodes);

  useEffect(() => {
    setNodesState(initialNodes);
  }, [initialNodes]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodesState((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mt-4 text-center">
        <div>
          <label className="font-bold">Max Depth: {maxDepth}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={maxDepth}
            onChange={(e) => setMaxDepth(Number(e.target.value))}
            className="ml-2"
          />
        </div>
        <div className="font-mono bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded">
          <strong>Memory Usage:</strong> {memoryUsage !== null ? `${memoryUsage.toFixed(2)} MB` : 'N/A'}
        </div>
      </div>
      <div className="w-full mx-auto my-8 border rounded-lg" style={{ height: 'calc(100vh - 150px)' }}>
        <ReactFlow
          nodes={nodesState}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          fitView
          edgeTypes={{ customEdge: CustomEdge }}
          defaultEdgeOptions={{
            type: ConnectionLineType.Bezier,
            animated: true,
            style: { stroke: '#ff0072', strokeWidth: 2 },
          }}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
