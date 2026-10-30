import './AppSrtucture.scss'
import { useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'

export function AppStructure() {
    const { selectedNode } = useContext(dataContext)

    return (
        <>
            <p>{selectedNode ? selectedNode.label : ""}</p>
            <p>показ струтктуры в разработке...</p>
        </>
    )
}