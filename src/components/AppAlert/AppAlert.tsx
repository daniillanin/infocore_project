import type { severity } from './AppAlertTypes'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'

export default function AppAlert() {
    const alert = useRef(null)
    const showAlert = (severity: severity, title: string, message: string, time: number): void => {
        alert.current.show({severity: severity, summary: title, detail: message, life: time})
    }
    return (
        <Toast ref={alert} />
    )
}