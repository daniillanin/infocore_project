import './AppPage.scss'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useContext, useEffect, useState } from 'react'
import { supabase } from '../../database/supabase'
import { dataContext } from '../../contexts/DataContext'
import { AppEditor } from '../AppEditor/AppEditor'

export function AppPage() {
    const { selectedNode, setSelectedNode } = useContext<DataContextInterface>(dataContext)
    const [currentContent, setCurrentContent] = useState<string>("")

    const setContent = (newValue: string): void => { 
        setCurrentContent(newValue) 
    }
    const saveEdit = async () => {
        const updateDataNode = {...selectedNode?.data, content: currentContent}
        const { error } = await supabase.from("pages").update({'data': updateDataNode}).eq('id', selectedNode?.id)
    }
    useEffect(() => {
        setCurrentContent(selectedNode?.data.content)
    }, [selectedNode])
    return (
        <>  
            <button onClick={saveEdit}>Сохранить изменения</button>
            <h1>{selectedNode ? selectedNode.label : ''}</h1>
            <div>{selectedNode ? <AppEditor content={currentContent} setContent={setContent}/> : ''}</div>
        </>
    )
}