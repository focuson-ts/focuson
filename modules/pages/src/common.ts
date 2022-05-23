export interface CustomButtonType {
    buttonType?: 'primary' | 'secondary' | 'default'
}

export const getButtonClassName = (buttonType: string | undefined) => (buttonType == 'primary' ? 'primary-btn' : (buttonType == 'secondary' ? 'secondary-btn' : 'button'))