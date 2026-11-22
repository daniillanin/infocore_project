import type { TreeNode } from 'primereact/treenode'

export interface Library {
    id: string;
    key: string;
    name: string
}
export interface DataReducerInterface {
    libraries: Library[] | null,
    folders: TreeNode[] | null,
    pages: TreeNode[] | null,
    selectedLibrary: Library | null,
    selectedNode: TreeNode | null,
    selectedNodeMove: TreeNode | null,
}