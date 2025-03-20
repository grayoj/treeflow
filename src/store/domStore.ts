import { create } from 'zustand';

export interface DomNode {
  id: string;
  tag: string;
  children?: DomNode[];
}

function getRealDomTree(el: Element): DomNode {
  return {
    id: el.tagName + '_' + Math.random().toString(36).substring(2),
    tag: el.tagName.toLowerCase(),
    children: Array.from(el.children).map(getRealDomTree),
  };
}

export interface DomStore {
  domTree: DomNode;
  updateDom: () => void;
}

export const useDomStore = create<DomStore>((set) => ({
  domTree: getRealDomTree(document.body),
  updateDom: () => set({ domTree: getRealDomTree(document.body) }),
}));
