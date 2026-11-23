import type { AppModalPropInterface } from './AppModalTypes'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export function AppModal({ children, titleModal, visibleModal, setVisibleModal, onSaveButton }: AppModalPropInterface) {
    const [ visibleConfirm, setVisibleConfirm ] = useState(false)
    const [ resolveConfirm, setResolveConfirm ] = useState<((a: boolean) => void) | null>(null)

    const openConfirm = () => {
        setVisibleConfirm(true)
        const confirm = new Promise<boolean>((resolve) => {
            setResolveConfirm(() => resolve)
        })
        confirm.then((answerConfirm) => {
            return new Promise<void>((resolve) => {
                if (answerConfirm) {
                    onSaveButton()
                    setVisibleConfirm(false)
                    setVisibleModal(false)
                } else {
                    setVisibleConfirm(false)
                    setVisibleModal(false)
                }
                resolve()
            })
        })
    }

    const header = () => {
        return (
            <p>{ titleModal }</p>
        )
    }
    const footer = () => {
        return (
            <>
                <Button onClick={() => openConfirm()}>Отменить</Button>
                <Button onClick={() => openConfirm()}>Сохранить</Button>
            </>
        )
    }
    const headerConfirm = () => {
        return (
            <p>Подтвердите действие</p>
        )
    }
    const footerConfirm = () => {
        return (
            <>
                <Button onClick={() => resolveConfirm!(false)}>Нет</Button>
                <Button onClick={() => resolveConfirm!(true)}>Да</Button>
            </>
        )
    }

    return (
        <>
            <Dialog
                visible={visibleModal}
                onHide={() => setVisibleModal(false)}
                header={header()}
                footer={footer()}
                style={{ width: '50vw' }}>
                { children }
            </Dialog>
            <Dialog
                visible={visibleConfirm}
                onHide={() => resolveConfirm!(false)}
                header={headerConfirm()}
                footer={footerConfirm()}
                style={{ width: '20vw' }}>
            </Dialog>
        </> 
    )
}
