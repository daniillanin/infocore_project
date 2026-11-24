import type { AppConfirmPropInterface } from './AppConfirmTypes'
import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export function AppConfirm({ children, visibleConfirm, setVisibleConfirm, titleConfirm, onSaveButton }: AppConfirmPropInterface) {
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
                } else {
                    setVisibleConfirm(false)
                }
                resolve()
            })
        })
    }
    const headerConfirm = () => {
        return (
            <p>{titleConfirm}</p>
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

    useEffect(() => {
        visibleConfirm ? openConfirm() : null
    }, [visibleConfirm])

    return (
        <Dialog
            visible={visibleConfirm}
            onHide={() => resolveConfirm!(false)}
            header={headerConfirm()}
            footer={footerConfirm()}
            style={{ width: '20vw' }}>
            { children }
        </Dialog>
    )
}