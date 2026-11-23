export interface AppModalPropInterface {
    children: React.ReactNode;
    titleModal: string;
    visibleModal: boolean;
    setVisibleModal: (a: boolean) => void;
    onSaveButton: () => void
}