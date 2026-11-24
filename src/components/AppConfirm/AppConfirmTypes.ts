export interface AppConfirmPropInterface {
    children?: React.ReactNode;
    titleConfirm: string;
    visibleConfirm: boolean;
    setVisibleConfirm: (a: boolean) => void;
    onSaveButton: () => void
}