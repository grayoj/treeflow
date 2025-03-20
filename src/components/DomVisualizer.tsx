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

export default function DOMVisualizer() {
  const { domTree } = useDomStore();

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const generateGraph = (node: any, x = 0, y = 0, parentId: string | null = null) => {
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
          animated: true,
        });
      }

      (node.children || []).forEach((child: any, index: number) => {
        generateGraph(child, x + 200, y + index * 120, node.id);
      });
    };

    generateGraph(domTree);
    return { initialNodes: nodes, initialEdges: edges };
  }, [domTree]);

  const [nodesState, setNodesState] = useState<Node[]>(initialNodes);

  useEffect(() => {
    setNodesState(initialNodes);
  }, [initialNodes]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodesState((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div className="w-full mx-auto my-8 border rounded-lg dark:border-gray-600" style={{ height: 'calc(100vh - 150px)' }}>
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
  );
}
