import type { AppModalPropInterface } from './AppModalTypes'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export function AppModal({ children, title, visible, setVisible, onSaveButton }: AppModalPropInterface) {
    const header = () => {
        return (
            <p>{title}</p>
        )
    }
    const footer = () => {
        return (
            <>
                <Button onClick={() => setVisible(false)}>Отменить</Button>
                <Button onClick={() => {onSaveButton(); setVisible(false)}}>Сохранить</Button>
            </>
        )
    }
    return (
        <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            header={header()}
            footer={footer()}
            style={{ width: '50vw' }}>
            { children }
        </Dialog>
    )
    
}