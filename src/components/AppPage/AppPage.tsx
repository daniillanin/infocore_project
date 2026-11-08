import './AppPage.scss'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useContext} from 'react'
import { supabase } from '../../database/supabase'
import { dataContext } from '../../contexts/DataContext'
import { AppEditor } from '../AppEditor/AppEditor'

export function AppPage() {
    const {selectedNode, setSelectedNode, setPages} = useContext<DataContextInterface>(dataContext)

    const setContent = (newValue: string): void => {  
        const updateDataNode = {...selectedNode?.data, content: newValue}
        setSelectedNode((prev) => ({...prev, data: updateDataNode}))
    }
    const saveEdit = async () => {
        const { error } = await supabase.from("pages").update({'data': selectedNode?.data}).eq('id', selectedNode?.id)
        if (!error) {
            setPages((prev) => prev?.map((page) => page.id === selectedNode?.id ? selectedNode : page))
        }
    }
    return (
        <>  
            <button onClick={saveEdit}>Сохранить изменения</button>
            <h1>{selectedNode ? selectedNode.label : ''}</h1>
            <div>{selectedNode ? <AppEditor content={selectedNode?.data.content} setContent={setContent}/> : ''}</div>
        </>
    )
}