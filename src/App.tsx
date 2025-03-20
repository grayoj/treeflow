import CommandInput from '@/components/CommandInput';
import { ThemeProvider } from 'next-themes';
import DOMVisualizer from './components/DomVisualizer';
import JSONVisualizer from './components/JSONVisualizer';

export default function App() {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-center capitalize font-bold text-3xl py-4 text-gray-800 dark:text-gray-200">
            Treeflow
          </h1>
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg pb-4">
            A real-time DOM tree visualizer that allows users to inspect, manipulate,
            and explore the structure of a webpage.
          </p>
          <CommandInput />
          <DOMVisualizer />
          <JSONVisualizer />
          <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Made by{' '}
            <a
              href="https://github.com/grayoj"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-gray-800 dark:hover:text-gray-200"
            >
              Gerald Okereke 🚀
            </a>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}
