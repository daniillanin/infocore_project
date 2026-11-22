import './AppSrtucture.scss'
import type { DataReducerInterface } from '../../types/DataReducerTypes'
import { MOVE_ITEM, DELETE_ITEM } from '../../store/actions/DataActions'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppModal } from '../AppModal/AppModal'
import { AppTreeMove } from '../AppTreeMove/AppTreeMove'

export function AppStructure() {
    const selectedNode = useSelector((state: DataReducerInterface) => state.selectedNode)
    const dispatch = useDispatch()
    const [ visibleModal, setVisibleModal ] = useState(false)

    return (
        <>
            <button onClick={() => dispatch(DELETE_ITEM())}>Удалить папку</button>
            <button onClick={() => setVisibleModal(true)}>Переместить папку</button>
            <p>{selectedNode ? selectedNode.label : ""}</p>
            <p>показ струтктуры в разработке...</p>
            <AppModal
                title={'Выберите папку для перемещения'}
                visible={visibleModal}
                setVisible={setVisibleModal}
                onSaveButton={() => dispatch(MOVE_ITEM())}>
                <AppTreeMove/>
            </AppModal>
        </>
    )
}