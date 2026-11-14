import './AppPage.scss'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useContext} from 'react'
import { supabase } from '../../database/supabase'
import { dataContext } from '../../contexts/DataContext'
import { AppEditor } from '../AppEditor/AppEditor'
import { Button } from 'primereact/button'

export function AppPage({setDialog}) {
    const {selectedNode, setSelectedNode, setPages, deleteItem} = useContext<DataContextInterface>(dataContext)

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
        <div className='page-wrapper'> 
            <div className='page-header'>
                <Button size="small" icon="pi pi-save" severity="success" onClick={saveEdit}></Button>
                <Button size="small" icon="pi pi-reply" onClick={() => setDialog(true)}/>
                <Button size="small" icon="pi pi-trash" severity="danger" onClick={deleteItem}/>
            </div>
            <h1>{selectedNode ? selectedNode.label : ''}</h1>
            <div className='page-content'>{selectedNode ? <AppEditor content={selectedNode?.data.content} setContent={setContent}/> : ''}</div>
            <div className='page-footer'></div>
        </div>
    )
}