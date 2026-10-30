import './AppPage.scss'
import { useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'

export function AppPage() {
    const { selectedNode } = useContext(dataContext)

    return (
        <>
            <h1>{selectedNode ? selectedNode.label : ''}</h1>
            <p>показ контента в разработке...</p>
            <p>{selectedNode ? selectedNode.data.content : ''}</p>
        </>
    )
}