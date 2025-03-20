# Treeflow - A DOM Visualizer

Treeflow is a tool that visualizes the structure of a webpage’s DOM (Document Object Model) in real time. It converts the hierarchical relationships between elements into an interactive tree, allowing users to inspect, modify, and explore the webpage’s structure dynamically.

![Treeflow Preview](https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjnxMO6AOupTo3uQUHaivRf6V9ePmEy0kIchZd)


## How It Works

Treeflow captures the current state of the DOM and represents it as a graph. Each HTML element becomes a node, and parent-child relationships are shown as connecting edges. The visualization updates when elements are added, removed, or modified.

### Accuracy Considerations

- The structure displayed is based on the DOM at the time of capture.
- Some dynamically generated elements may not appear immediately if they are loaded asynchronously.
- Treeflow does not display non-DOM elements like JavaScript variables or event listeners.

## Features

- **Real-Time DOM Inspection** - See the structure of the webpage’s DOM as it currently exists.
- **Command Execution** - Run JavaScript commands to modify the DOM and see the changes reflected in the visualization.
- **Interactive Graph** - Click on nodes to highlight elements and understand their relationships.
- **JSON Representation** - View the DOM as structured JSON data.
- **Light and Dark Mode** - Adjust the interface for better readability.

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/grayoj/treeflow.git
cd treeflow
```

### 2. Install Dependencies

Using Bun (preferred):
```sh
bun install
```
or using npm:
```sh
npm install
```

### 3. Run the Application

Using Bun:
```sh
bun run dev
```
or using npm:
```sh
npm run dev
```

## Usage

- Run JavaScript commands in the input box to inspect or modify the DOM.
- Click on elements in the visualizer to see their relationships.
- Use the JSON view to get a structured representation of the DOM tree.
- Refresh the page to reset the visualization if needed.

## License

This project is open-source under the MIT License.

