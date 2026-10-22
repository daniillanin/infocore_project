import { Tree } from 'primereact/tree'
import type { TreeNode } from 'primereact/treenode'
import { useEffect, useState } from 'react'
import './AppTree.scss'
import { supabase } from '../../database/supabase'

export default function AppTree() {
    const [folders, setFolders] = useState<TreeNode[] | null>(null)
    const [pages, setPages] = useState<TreeNode[] | null>(null)
    const [structure, setStructure] = useState<TreeNode[]>([])
    const [selectedKey, setSelectedKey] = useState<string>('')
    
    const createFolder = async() => {
        const createUUID = crypto.randomUUID()
        const folder: TreeNode = {
            id: createUUID,
            key: createUUID,
            label: `Папка ${Math.floor(Math.random() * 1000) + 1}`,
            data: {
                type: 'folder',
                parentFolderID: null,
                // directionID: null,
                level: 1
            },
            icon: 'pi pi-fw pi-folder',
            children: [],
            style: undefined,
            className: undefined,
            droppable: undefined,
            draggable: undefined,
            selectable: undefined,
            leaf: undefined,
            expanded: undefined
        }
        const { success } = await supabase.from('folders').insert(folder)
        success ? setFolders((prev) => [...prev!, folder]) : null
    }

    const createPage = async() => {
        const createUUID = crypto.randomUUID()
        const page: TreeNode = {
            id: createUUID,
            key: createUUID,
            label: `Страница ${Math.floor(Math.random() * 1000) + 1}`,
            data: {
                type: 'page',
                parentFolderID: null,
                // directionID: null,
                content: '<p>Текст параграфа</p>'
            },
            icon: 'pi pi-fw pi-file',
            children: undefined,
            style: undefined,
            className: undefined,
            droppable: undefined,
            draggable: undefined,
            selectable: undefined,
            leaf: undefined,
            expanded: undefined
        }
        const { success } = await supabase.from('pages').insert(page)
        success ? setPages((prev) => [...prev!, page]) : null
    }

    const deletePage = async () => {
        const { success } = await supabase.from('pages').delete().eq('id', selectedKey)
        if (success) {
            setPages((prev) => prev?.filter((page) => page.id !== selectedKey) ?? null)
        }
    }

    useEffect(() => {
        const getData = async() => {
            const dataFolders = await supabase.from('folders').select('*')
            setFolders(dataFolders.data)
            const dataPages = await supabase.from('pages').select('*')
            setPages(dataPages.data)
        }
        getData()
    }, [])

    useEffect(() => {
        if (folders && pages) {
            const cloneFolders = structuredClone(folders)
            const clonePages = structuredClone(pages)
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
            <button onClick={createFolder}>Загрузить папку на сервак</button>
            <button onClick={createPage}>Загрузить док на сервак</button>
            <button onClick={deletePage}>Удалить док с сервака</button>
            <br />
            <Tree
                value={structure}
                selectionMode="single"
                selectionKeys={selectedKey}
                onSelectionChange={(e) => setSelectedKey(e.value as string)}
                filter
                filterMode="lenient"
                filterPlaceholder="Поиск"
            />
        </>  
    )
}