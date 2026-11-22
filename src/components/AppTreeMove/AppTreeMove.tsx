import './AppTreeMove.scss'
import type { TreeNode } from 'primereact/treenode'
import type { DataReducerInterface } from '../../types/DataReducerTypes'
import { useEffect, useState } from 'react'
import { Tree } from 'primereact/tree'
import { useSelector, useDispatch } from 'react-redux'

export function AppTreeMove() {
    const folders = useSelector((state: DataReducerInterface) => state.folders)
    const selectedNode = useSelector((state: DataReducerInterface) => state.selectedNode)
    const dispatch = useDispatch()
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
            onSelect={(e) => dispatch({type: "SET_SELECTED_NODE_MOVE", payload: e.node})}
            onUnselect={() => dispatch({type: "SET_SELECTED_NODE_MOVE", payload: null})}
            // filter
            // filterMode="lenient"
            // filterPlaceholder="Поиск"
            // emptyMessage="Ничего не найдено"
            // className='tree'
        />
    )
}