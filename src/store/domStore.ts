import { create } from 'zustand';

export interface DomNode {
  id: string;
  tag: string;
  children?: DomNode[];
}

function getRealDomTree(el: Element, maxDepth = 10, depth = 0): DomNode | null {
  if (!el || depth > maxDepth) return null;

  return {
    id: el.tagName + '_' + Math.random().toString(36).substring(2),
    tag: el.tagName.toLowerCase(),
    children: Array.from(el.children)
      .map((child) => getRealDomTree(child, maxDepth, depth + 1))
      .filter(Boolean) as DomNode[],
  };
}

export interface DomStore {
  domTree: DomNode;
  updateDom: (maxDepth?: number) => void;
}


export const useDomStore = create<DomStore>((set) => ({
  domTree: getRealDomTree(document.body, 5)!,
  updateDom: (maxDepth = 5) => {
    requestAnimationFrame(() => {
      set({ domTree: getRealDomTree(document.body, maxDepth)! });
    });
  },
}));

