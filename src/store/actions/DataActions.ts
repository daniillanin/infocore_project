import type { Library } from '../../types/DataContextTypes'
import type { TreeNode } from 'primereact/treenode'
import { supabase } from '../../database/supabase'

export const SET_SELECTED_LIBRARY = (selectedLibrary: Library) => {
    return { type: 'SET_SELECTED_LIBRARY', payload: selectedLibrary }
}
export const GET_LIBRARIES = () => async (dispatch: any): Promise<void> => {
    const { data: libraries } = await supabase.from('libraries').select('*')
    dispatch({type: 'SET_LIBRARIES', payload: libraries})
}
export const GET_FOLDERS = (selectedLibrary: Library) => async (dispatch: any): Promise<void> => {
    const { data: folders } = await supabase.from('folders').select().eq('data->>libraryID', selectedLibrary?.id)
    dispatch({type: 'SET_FOLDERS', payload: folders})
}
export const GET_PAGES = (selectedLibrary: Library) => async (dispatch: any): Promise<void> => {
    const { data: pages } = await supabase.from('pages').select().eq('data->>libraryID', selectedLibrary?.id)
    dispatch({type: 'SET_PAGES', payload: pages})
}
export const CREATE_LIBRARY = () => async (dispatch: any): Promise<void> => {
    const createUUID = crypto.randomUUID()
    const number = Math.floor(Math.random() * 1000) + 1
    const library: Library = {
        id: createUUID,
        key: `LIB${number}`,
        name: `Библиотека ${number}`,
    }
    const { error } = await supabase.from('libraries').insert(library)
    !error ? dispatch({type: 'CREATE_LIBRARY', payload: library}) : null
}
export const CREATE_PAGE = () => async (dispatch: any, getState: any): Promise<void> => {
    const selectedLibrary = getState().selectedLibrary
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
        !error ? dispatch({type: 'CREATE_PAGE', payload: page}) : null
    }
}
export const CREATE_FOLDER = () => async (dispatch: any, getState: any): Promise<void> => {
    const selectedLibrary = getState().selectedLibrary
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
        !error ? dispatch({type: 'CREATE_FOLDER', payload: folder}) : null
    }
}
export const MOVE_ITEM = () => async (dispatch: any, getState: any): Promise<void> => {
    const folders = getState().folders
    const pages = getState().pages
    const selectedNode = getState().selectedNode
    const selectedNodeMove = getState().selectedNodeMove
    if (selectedNodeMove) {
        if (selectedNode?.data.type === 'folder') {
            const { error } = await supabase.from('folders').update({data: {...selectedNode.data, parentFolderID: selectedNodeMove.id}}).eq('id', selectedNode.id)
            if (!error) {
                const refreshFolders = folders?.map((folder: TreeNode) => folder.id === selectedNode.id ? {...folder, data: {...folder.data, parentFolderID: selectedNodeMove.id}} : folder)
                dispatch({type: 'SET_FOLDERS', payload: refreshFolders})
            }
        } else if (selectedNode?.data.type === 'page') {
            const { error } = await supabase.from('pages').update({data: {...selectedNode.data, parentFolderID: selectedNodeMove.id}}).eq('id', selectedNode.id)
            if (!error) {
                const refreshPages = pages?.map((page: TreeNode) => page.id === selectedNode.id ? {...page, data: {...page.data, parentFolderID: selectedNodeMove.id}} : page)
                dispatch({type: 'SET_PAGES', payload: refreshPages})
            }
        }
        dispatch({type: 'SET_SELECTED_NODE_MOVE', payload: null})
    } else {
        if (selectedNode?.data.type === 'folder') {
            const { error } = await supabase.from('folders').update({data: {...selectedNode.data, parentFolderID: null}}).eq('id', selectedNode.id)
            if (!error) {
                const refreshFolders = folders?.map((folder: TreeNode) => folder.id === selectedNode.id ? {...folder, data: {...folder.data, parentFolderID: null}} : folder)
                dispatch({type: 'SET_FOLDERS', payload: refreshFolders})
            }
        } else if (selectedNode?.data.type === 'page') {
            const { error } = await supabase.from('pages').update({data: {...selectedNode.data, parentFolderID: null}}).eq('id', selectedNode.id)
            if (!error) {
                const refreshPages = pages?.map((page: TreeNode) => page.id === selectedNode.id ? {...page, data: {...page.data, parentFolderID: null}} : page)
                dispatch({type: 'SET_PAGES', payload: refreshPages})
            }
        }
    }
}
export const DELETE_ITEM = () => async (dispatch: any, getState: any): Promise<void> => {
    const folders = getState().folders
    const pages = getState().pages
    const selectedNode = getState().selectedNode
    if (selectedNode.data.type === 'folder') {
        const { data: childrenFolders } = await supabase.from('folders').select().eq('data->>parentFolderID', selectedNode?.id)
        const { data: childrenPages } = await supabase.from('pages').select().eq('data->>parentFolderID', selectedNode?.id)
        const childrenFoldersID: string[] = childrenFolders!.map((folder) => folder.id)
        const childrenPagesID: string[] = childrenPages!.map((page) => page.id)
        if (childrenFoldersID.length > 0) {
            const { error } = await supabase.from('folders').delete().eq('id', selectedNode?.id)
            if (!error) {
                childrenFoldersID.forEach(async (folderID) => {
                    const { data: folder } = await supabase.from('folders').select('data').eq('id', folderID).single()
                    const { error } = await supabase.from('folders').update({ data: { ...folder?.data, parentFolderID: null }}).eq('id', folderID)
                    if (!error) {
                        const refreshFolders = folders?.filter((folder: TreeNode) => folder.id !== selectedNode?.id)
                        dispatch({type: 'SET_FOLDERS', payload: refreshFolders})
                    }
                })
            }
        } else {
            const { error } = await supabase.from('folders').delete().eq('id', selectedNode?.id)
            if (!error) {
                const refreshFolders = folders?.filter((folder: TreeNode) => folder.id !== selectedNode?.id)
                dispatch({type: 'SET_FOLDERS', payload: refreshFolders})
            }    
        }
        if (childrenPagesID.length > 0) {
            childrenPagesID.forEach(async (pageID) => {
                const { data: page } = await supabase.from('pages').select('data').eq('id', pageID).single()
                const { error } = await supabase.from('pages').update({ data: { ...page?.data, parentFolderID: null }}).eq('id', pageID)
            })
        }
    } else if (selectedNode.data.type === 'page') {
        const { error } = await supabase.from('pages').delete().eq('id', selectedNode?.id)
        if (!error) {
            const refreshPages = pages?.filter((page: TreeNode) => page.id !== selectedNode?.id)
            dispatch({type: 'SET_PAGES', payload: refreshPages})
        }
    }
}