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

    const deleteFolder = async () => {
        const { data: childrenFolders } = await supabase.from('folders').select().eq('data->>parentFolderID', selectedKey)
        const { data: childrenPages } = await supabase.from('pages').select().eq('data->>parentFolderID', selectedKey)
        const childrenFoldersID: string[] = childrenFolders!.map((folder) => folder.id)
        const childrenPagesID: string[] = childrenPages!.map((page) => page.id)
            if (childrenFoldersID.length > 0) {
                const { success, error } = await supabase.from('folders').delete().eq('id', selectedKey)
                if ( success ) {
                    childrenFoldersID.forEach(async (folderID) => {
                        const { data: folder } = await supabase.from('folders').select('data').eq('id', folderID).single()
                        const { error } = await supabase.from('folders').update({ data: { ...folder?.data, parentFolderID: null }}).eq('id', folderID)
                        error ? console.log(error) : setFolders((prev) => prev?.filter((folder) => folder.id !== selectedKey) ?? null)
                    })
                } else {
                    console.log(error)
                } 
            } else { 
                const { error } = await supabase.from('folders').delete().eq('id', selectedKey)
                error ? console.log(error) : setFolders((prev) => prev?.filter((folder) => folder.id !== selectedKey) ?? null)
            }
            if (childrenPagesID.length > 0) {
                childrenPagesID.forEach(async (pageID) => {
                    const { data: page } = await supabase.from('pages').select('data').eq('id', pageID).single()
                    const { error } = await supabase.from('pages').update({ data: { ...page?.data, parentFolderID: null }}).eq('id', pageID)
                    error ? console.log(error) : console.log("page update SB OK")
                })
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
            <button onClick={deletePage}>Удалить док</button>
            <button onClick={deleteFolder}>Удалить папку</button>
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