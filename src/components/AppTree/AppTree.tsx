import './AppTree.scss'
import { useEffect, useState, useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { supabase } from '../../database/supabase'
import { Tree } from 'primereact/tree'
import type { TreeNode } from 'primereact/treenode'
import type { DataContextInterface, Library } from '../../types/interfaces'

export function AppTree() {
    const {folders, pages, setSelectedNode, createFolder, createPage, deleteItem} = useContext<DataContextInterface>(dataContext)
    const [structure, setStructure] = useState<TreeNode[]>([])
    const [selectedKey, setSelectedKey] = useState<string | null>(null)

    const createLibrary = async () => {
        const createUUID = crypto.randomUUID()
        const number = Math.floor(Math.random() * 1000) + 1
        const library: Library = {
            id: createUUID,
            key: `LIB${number}`,
            name: `Библиотека ${number}`,
        }
        await supabase.from('libraries').insert(library)
    }

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
        <>
            <Tree
                value={structure}
                selectionMode="single"
                selectionKeys={selectedKey}
                onSelectionChange={(e) => setSelectedKey(e.value as string)}
                onSelect={(e) => setSelectedNode(e.node)}
                onUnselect={() => setSelectedNode(null)}
                filter
                filterMode="lenient"
                filterPlaceholder="Поиск"
                emptyMessage="Ничего не найдено"
                className='tree'
            />
            <div>
                <button onClick={createFolder}>Добавить папку</button><br/>
                <button onClick={createPage}>Добавить страницу</button><br/>
                <button onClick={deleteItem}>Удалить</button><br/>
                <button onClick={createLibrary}>Создать библ</button>
            </div> 
        </>  
    )
}