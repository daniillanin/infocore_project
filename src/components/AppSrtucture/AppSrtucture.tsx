import './AppSrtucture.scss'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'

export function AppStructure() {
    const {selectedNode, deleteItem} = useContext<DataContextInterface>(dataContext)

    return (
        <>
            <button onClick={deleteItem}>Удалить папку</button>
            <p>{selectedNode ? selectedNode.label : ""}</p>
            <p>показ струтктуры в разработке...</p>
        </>
    )
}