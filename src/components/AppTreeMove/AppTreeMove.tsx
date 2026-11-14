import './AppTreeMove.scss'
import type { TreeNode } from 'primereact/treenode'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useEffect, useState, useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { Tree } from 'primereact/tree'

export function AppTreeMove() {
    const {folders, selectedNode, setSelectedNodeMove} = useContext<DataContextInterface>(dataContext)
    const [structure, setStructure] = useState<TreeNode[]>([])
    const [selectedKey, setSelectedKey] = useState<string | null>(null)

    useEffect(() => {
        if (folders) {
            //клон массива папок с исключением выбранной папки из списка дерева
            const cloneFolders: TreeNode[] = structuredClone(folders).filter((folder) => folder.id !== selectedNode?.id)
            //распределение вложенности папок по структуре
            const foldersMap = new Map<string, TreeNode>()
            cloneFolders?.forEach((folder) => foldersMap.set(folder.id!, folder))
            const completeStructure: TreeNode[] = []
            cloneFolders?.forEach((item) => {
                if (item.data.type === "folder") {
                    const parent = item.data.parentFolderID ? foldersMap.get(item.data.parentFolderID) : undefined
                    parent ? parent.children?.unshift(item) : completeStructure.push(item)
                } else if (item.data.type === "page") {
                    completeStructure.push(item)
                }
            })
            setStructure(completeStructure)
        }
    }, [folders])

    return (
        <Tree
            value={structure}
            selectionMode="single"
            selectionKeys={selectedKey}
            onSelectionChange={(e) => setSelectedKey(e.value as string)}
            onSelect={(e) => setSelectedNodeMove(e.node)}
            onUnselect={() => setSelectedNodeMove(null)}
            // filter
            // filterMode="lenient"
            // filterPlaceholder="Поиск"
            // emptyMessage="Ничего не найдено"
            // className='tree'
        />
    )
}