import type { TreeNode } from "primereact/treenode"
import type { ReactNode } from "react";

export interface DataContextInterface {
    folders: TreeNode[] | null;
    pages: TreeNode[] | null;
    selectedNode: TreeNode | null;
    setFolders: React.Dispatch<React.SetStateAction<TreeNode[] | null>>;
    setPages: React.Dispatch<React.SetStateAction<TreeNode[] | null>>;
    setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>
}

export interface DataContextProviderProps {
    children: ReactNode
}