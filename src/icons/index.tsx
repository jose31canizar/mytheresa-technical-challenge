import { AccessibilityProps } from 'react-native/types'

export interface IconProps extends AccessibilityProps {
    selected?: boolean;
    size?: number;
    color?: string;
    disabled?: boolean;
    fillColor?: string;
}

export { default as Home } from './home'
export { default as Close } from './close'
export { default as Star } from './star'