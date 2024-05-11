//tire: Node
export interface Node {
    key: string;
    parent?: Node;
    callback?: () => void;
    children: Map<string, Node>; 
}