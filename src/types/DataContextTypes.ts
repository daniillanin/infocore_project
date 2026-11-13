import type { TreeNode } from "primereact/treenode"
import type { ReactNode } from "react";

export interface DataContextInterface {
    libraries: Library[] | null;
    folders: TreeNode[] | null;
    pages: TreeNode[] | null;
    selectedNode: TreeNode | null;
    selectedNodeMove: TreeNode | null;
    setFolders: React.Dispatch<React.SetStateAction<TreeNode[] | null>>;
    setPages: React.Dispatch<React.SetStateAction<TreeNode[] | null>>;
    setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>;
    setSelectedNodeMove: React.Dispatch<React.SetStateAction<TreeNode | null>>;
    setSelectedLibrary: React.Dispatch<React.SetStateAction<Library | null>>;
    createLibrary: () => Promise<void>;
    createFolder: () => Promise<void>;
    createPage: () => Promise<void>;
    moveItem: () => Promise<void>;
    deleteItem: () => Promise<void>
}
export interface DataContextProviderProps {
    children: ReactNode
}
export interface Library {
    id: string;
    key: string;
    name: string
}