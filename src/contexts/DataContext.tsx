import { useState, useEffect, createContext } from 'react'
import { supabase } from '../database/supabase'
import type { TreeNode } from 'primereact/treenode'

export const dataContext = createContext(null)

export function DataContextProvider({children}) {
    const [folders, setFolders] = useState<TreeNode[] | null>(null)
    const [pages, setPages] = useState<TreeNode[] | null>(null)
    const [selectedID, setSelectedID] = useState<string>("") 

    const getData = async(): Promise<void> => {
        const dataFolders = await supabase.from('folders').select('*')
            setFolders(dataFolders.data)
        const dataPages = await supabase.from('pages').select('*')
            setPages(dataPages.data)
    }
    const getSelectedID = (selectedKey: string): void => {
        setSelectedID(selectedKey)
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <dataContext.Provider value={{folders, setFolders, pages, setPages, getSelectedID, selectedID}}>
            {children}
        </dataContext.Provider>
    )
}   