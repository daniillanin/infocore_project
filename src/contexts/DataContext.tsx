import { useState, useEffect, createContext } from 'react'
import { supabase } from '../database/supabase'
import type { TreeNode } from 'primereact/treenode'
import type { DataContextInterface } from '../types/interfaces'
import type { DataContextProviderProps } from '../types/interfaces'
import type { Library } from '../types/interfaces'

export const dataContext = createContext<DataContextInterface | null>(null)

export function DataContextProvider({children}: DataContextProviderProps) {
    const [libraries, setLibraries] = useState<Library[] | null>(null)
    const [folders, setFolders] = useState<TreeNode[] | null>(null)
    const [pages, setPages] = useState<TreeNode[] | null>(null)
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
    const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null) 

    const getData = async(): Promise<void> => {
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
                setFolders,
                setPages,
                setSelectedNode,
                setSelectedLibrary
            }}>
            {children}
        </dataContext.Provider>
    )
}