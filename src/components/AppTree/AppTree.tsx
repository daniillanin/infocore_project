import './AppTree.scss'
import type { TreeNode } from 'primereact/treenode'
import type { DataReducerInterface } from '../../types/DataReducerTypes'
import { useEffect, useState } from 'react'
import { Tree } from 'primereact/tree'
import { useDispatch, useSelector } from 'react-redux'

export function AppTree() {
    const folders = useSelector((state: DataReducerInterface) => state.folders)
    const pages = useSelector((state: DataReducerInterface) => state.pages)
    const dispatch = useDispatch()
    const [structure, setStructure] = useState<TreeNode[]>([])
    const [selectedKey, setSelectedKey] = useState<string | null>(null)

    useEffect(() => {
        if (folders && pages) {
            const cloneFolders: TreeNode[] = structuredClone(folders)
            const clonePages: TreeNode[] = structuredClone(pages)
            //распределение страниц по папкам
            clonePages.forEach((page) => {
                const parent = page.data?.parentFolderID ? cloneFolders.find((folder) => folder.id === page.data.parentFolderID) : undefined
                parent ? parent.children?.push(page) : cloneFolders.push(page)
            })
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
    }, [folders, pages])

    return (
        <Tree
            value={structure}
            selectionMode="single"
            selectionKeys={selectedKey}
            onSelectionChange={(e) => setSelectedKey(e.value as string)}
            onSelect={(e) => dispatch({type: "SET_SELECTED_NODE", payload: e.node})}
            onUnselect={() => dispatch({type: "SET_SELECTED_NODE", payload: null})}
            filter
            filterMode="lenient"
            filterPlaceholder="Поиск"
            emptyMessage="Ничего не найдено"
            className='tree'
        />
    )
}