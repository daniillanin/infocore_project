import { useState, useEffect, createContext } from 'react'
import { supabase } from '../database/supabase'
import type { TreeNode } from 'primereact/treenode'
import type { DataContextInterface } from '../types/interfaces'
import type { DataContextProviderProps } from '../types/interfaces'

export const dataContext = createContext<DataContextInterface | null>(null)

export function DataContextProvider({children}: DataContextProviderProps) {
    const [folders, setFolders] = useState<TreeNode[] | null>(null)
    const [pages, setPages] = useState<TreeNode[] | null>(null)
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null) 

    const getData = async(): Promise<void> => {
        const dataFolders = await supabase.from('folders').select('*')
            setFolders(dataFolders.data)
        const dataPages = await supabase.from('pages').select('*')
            setPages(dataPages.data)
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <dataContext.Provider value={{folders, setFolders, pages, setPages, selectedNode, setSelectedNode}}>
            {children}
        </dataContext.Provider>
    )
}   