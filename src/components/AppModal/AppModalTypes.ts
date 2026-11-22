export interface AppModalPropInterface {
    children: React.ReactNode;
    title: string;
    visible: boolean;
    setVisible: (a: boolean) => void;
    onSaveButton: () => void
}