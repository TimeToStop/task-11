export interface IGlossaryItem {
  keyword: string;
  definition: string;
}

export interface INode {
  id: string;
  label: string;
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface IMindMap {
  nodes: INode[];
  edges: IEdge[];
}