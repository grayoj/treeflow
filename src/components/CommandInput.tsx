import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDomStore } from '@/store/domStore';

export default function CommandInput() {
  const { updateDom } = useDomStore();
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      try {
        eval(input);
      } catch (error) {
        console.error('Error executing command:', error);
      }
      updateDom();
      setInput('');
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b bg-white dark:bg-gray-700 border rounded-lg">
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter JS command (e.g., document.body.appendChild(document.createElement('div')))"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSubmit} className="px-4 py-2">
        Run Command
      </Button>
    </div>
  );
}
