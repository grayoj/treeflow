import ReactJson from 'react-json-view';
import { useDomStore } from '@/store/domStore';

export default function JSONVisualizer() {
  const { domTree } = useDomStore();

  return (
    <div
      className="w-full mx-auto my-8 border rounded-lg bg-gray-50 border-gray-200 p-4"
      style={{ maxHeight: '300px', overflow: 'auto' }}
    >
      <div className="sticky top-0 bg-gray-50 z-10 pb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">DOM JSON</h2>
      </div>
      <ReactJson
        src={domTree}
        name={null}
        collapsed={2}
        enableClipboard={false}
        displayDataTypes={true}
        theme="rjv-default"
      />
    </div>
  );
}
