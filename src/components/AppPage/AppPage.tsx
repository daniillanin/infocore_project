import './AppPage.scss'
import type { DataReducerInterface } from '../../types/DataReducerTypes'
import { MOVE_ITEM, DELETE_ITEM } from '../../store/actions/DataActions'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../../database/supabase'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { AppEditor } from '../AppEditor/AppEditor'
import { AppModal } from '../AppModal/AppModal'
import { AppTreeMove } from '../AppTreeMove/AppTreeMove'

export function AppPage() {
    const selectedNode = useSelector((state: DataReducerInterface) => state.selectedNode)
    const pages = useSelector((state: DataReducerInterface) => state.pages)
    const dispatch = useDispatch()
    const [ visibleModal, setVisibleModal ] = useState(false)
    const toast = useRef(null)

    const setContent = (newValue: string): void => {  
        const updateDataNode = {...selectedNode?.data, content: newValue}
        dispatch({type: 'SET_SELECTED_NODE_DATA', payload: updateDataNode})
    }
    const saveEdit = async () => {
        const { error } = await supabase.from("pages").update({'data': selectedNode?.data}).eq('id', selectedNode?.id)
        if (!error) {
            const refreshPages = pages?.map((page) => page.id === selectedNode?.id ? selectedNode : page)
            dispatch({type: 'SET_PAGES', payload: refreshPages})
            toast.current.show({ severity: 'success', summary: 'Успешно', detail: 'Сохранено', life: 1500 })
        }
    }
    return (
        <div className='page-wrapper'> 
            <div className='page-header'>
                <Button size="small" icon="pi pi-save" severity="success" onClick={saveEdit}/>
                <Button size="small" icon="pi pi-reply" onClick={() => setVisibleModal(true)}/>
                <Button size="small" icon="pi pi-trash" severity="danger" onClick={() => dispatch(DELETE_ITEM())}/>
            </div>
            <h1>{selectedNode ? selectedNode.label : ''}</h1>
            <div className='page-content'>{selectedNode ? <AppEditor content={selectedNode?.data.content} setContent={setContent}/> : ''}</div>
            <div className='page-footer'></div>
            <Toast ref={toast}/>
            <AppModal
                title={'Выберите папку для перемещения'}
                visible={visibleModal}
                setVisible={setVisibleModal}
                onSaveButton={() => dispatch(MOVE_ITEM())}>
                <AppTreeMove/>
            </AppModal>
        </div>
    )
}