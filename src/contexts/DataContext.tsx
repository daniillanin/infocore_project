import type { TreeNode } from 'primereact/treenode'
import type { DataContextInterface } from '../types/DataContextTypes'
import type { DataContextProviderProps } from '../types/DataContextTypes'
import type { Library } from '../types/DataContextTypes'
import { useState, useEffect, createContext } from 'react'
import { supabase } from '../database/supabase'

export const dataContext = createContext<DataContextInterface>(null as unknown as DataContextInterface)

export function DataContextProvider({children}: DataContextProviderProps) {
    const [libraries, setLibraries] = useState<Library[] | null>(null)
    const [folders, setFolders] = useState<TreeNode[] | null>(null)
    const [pages, setPages] = useState<TreeNode[] | null>(null)
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
    const [selectedNodeMove, setSelectedNodeMove] = useState<TreeNode | null>(null)
    const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null)

    const createLibrary = async () => {
        const createUUID = crypto.randomUUID()
        const number = Math.floor(Math.random() * 1000) + 1
        const library: Library = {
            id: createUUID,
            key: `LIB${number}`,
            name: `Библиотека ${number}`,
        }
        const { error } = await supabase.from('libraries').insert(library)
        !error ? setLibraries((prev) => [...prev!, library]) : null
    }

    const createFolder = async (): Promise<void> => {
        if (selectedLibrary) {
            const createUUID = crypto.randomUUID()
            const folder: TreeNode = {
                id: createUUID,
                key: createUUID,
                label: `Папка ${Math.floor(Math.random() * 1000) + 1}`,
                data: {
                    type: 'folder',
                    parentFolderID: null,
                    libraryID: selectedLibrary?.id,
                    archive: false,
                    level: null,
                    timeCreated: new Date().getTime()
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
            const { error } = await supabase.from('folders').insert(folder)
            !error ? setFolders((prev) => [...prev!, folder]) : null
            }
    }

    const createPage = async (): Promise<void> => {
        if (selectedLibrary) {
            const createUUID = crypto.randomUUID()
            const page: TreeNode = {
                id: createUUID,
                key: createUUID,
                label: `Страница ${Math.floor(Math.random() * 1000) + 1}`,
                data: {
                    type: 'page',
                    parentFolderID: null,
                    libraryID: selectedLibrary?.id,
                    archive: false,
                    content: '<p>Текст параграфа</p>',
                    timeCreated: new Date().getTime()
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
            const { error } = await supabase.from('pages').insert(page)
            !error ? setPages((prev) => [...prev!, page]) : null
        }
    }

    const moveItem = async (): Promise<void> => {
        if (selectedNodeMove) {
            if (selectedNode?.data.type === 'folder') {
                const { error } = await supabase.from('folders').update({data: {...selectedNode.data, parentFolderID: selectedNodeMove.id}}).eq('id', selectedNode.id)
                !error ? setFolders((prev) => prev?.map((folder) => folder.id === selectedNode.id ? {...folder, data: {...folder.data, parentFolderID: selectedNodeMove.id}} : folder)) : console.log(error)
                
            } else if (selectedNode?.data.type === 'page') {
                const { error } = await supabase.from('pages').update({data: {...selectedNode.data, parentFolderID: selectedNodeMove.id}}).eq('id', selectedNode.id)
                !error ? setPages((prev) => prev?.map((page) => page.id === selectedNode.id ? {...page, data: {...page.data, parentFolderID: selectedNodeMove.id}} : page)) : console.log(error)
            }
            setSelectedNodeMove(null)
        } else {
            if (selectedNode?.data.type === 'folder') {
                const { error } = await supabase.from('folders').update({data: {...selectedNode.data, parentFolderID: null}}).eq('id', selectedNode.id)
                !error ? setFolders((prev) => prev?.map((folder) => folder.id === selectedNode.id ? {...folder, data: {...folder.data, parentFolderID: null}} : folder)) : console.log(error)
            } else if (selectedNode?.data.type === 'page') {
                const { error } = await supabase.from('pages').update({data: {...selectedNode.data, parentFolderID: null}}).eq('id', selectedNode.id)
                !error ? setPages((prev) => prev?.map((page) => page.id === selectedNode.id ? {...page, data: {...page.data, parentFolderID: null}} : page)) : console.log(error)
            }
        }
    }

    const deleteItem = async (): Promise<void> => {
        if (selectedNode?.data.type === 'folder') {
            const { data: childrenFolders } = await supabase.from('folders').select().eq('data->>parentFolderID', selectedNode?.id)
            const { data: childrenPages } = await supabase.from('pages').select().eq('data->>parentFolderID', selectedNode?.id)
            const childrenFoldersID: string[] = childrenFolders!.map((folder) => folder.id)
            const childrenPagesID: string[] = childrenPages!.map((page) => page.id)
            if (childrenFoldersID.length > 0) {
                const { error } = await supabase.from('folders').delete().eq('id', selectedNode?.id)
                if ( !error ) {
                    childrenFoldersID.forEach(async(folderID) => {
                        const { data: folder } = await supabase.from('folders').select('data').eq('id', folderID).single()
                        const { error } = await supabase.from('folders').update({ data: { ...folder?.data, parentFolderID: null }}).eq('id', folderID)
                        !error ? setFolders((prev) => prev?.filter((folder) => folder.id !== selectedNode?.id) ?? null) : console.log(error)
                    })
                } else {
                    console.log(error)
                } 
            } else { 
                const { error } = await supabase.from('folders').delete().eq('id', selectedNode?.id)
                !error ? setFolders((prev) => prev?.filter((folder) => folder.id !== selectedNode?.id) ?? null) : console.log(error);     
            }
            if (childrenPagesID.length > 0) {
                childrenPagesID.forEach(async(pageID) => {
                    const { data: page } = await supabase.from('pages').select('data').eq('id', pageID).single()
                    const { error } = await supabase.from('pages').update({ data: { ...page?.data, parentFolderID: null }}).eq('id', pageID)
                    !error ? console.log("page update SB OK") : console.log(error)
                })
            }
        } else if (selectedNode?.data.type === 'page') {
            const { error } = await supabase.from('pages').delete().eq('id', selectedNode?.id)
            !error ? setPages((prev) => prev?.filter((page) => page.id !== selectedNode?.id) ?? null) : console.log(error)
        }
    }

    const getData = async (): Promise<void> => {
        const { data: folders } = await supabase.from('folders').select().eq('data->>libraryID', selectedLibrary?.id)
            setFolders(folders)
        const { data: pages } = await supabase.from('pages').select().eq('data->>libraryID', selectedLibrary?.id)
            setPages(pages)
        const { data: libraries } = await supabase.from('libraries').select('*')
            setLibraries(libraries)
    }

    useEffect(() => {
        getData()
    },[selectedLibrary])

    return (
        <dataContext.Provider value={{
                libraries,
                folders,
                pages,
                selectedNode,
                selectedNodeMove,
                setFolders,
                setPages,
                setSelectedNode,
                setSelectedNodeMove,
                setSelectedLibrary,
                createLibrary,
                createFolder,
                createPage,
                moveItem,
                deleteItem
            }}>
            {children}
        </dataContext.Provider>
    )
}