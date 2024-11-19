import React, { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

export interface BoxProps extends PropsWithChildren {
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  flex?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  marginTop?: number;
  marginBottom?: number;
  paddingTop?: number;
  paddingBottom?: number;
  flexDirection?: 'row' | 'column';
  paddingLeft?: number;
  paddingRight?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const StyledBox = styled.View<BoxProps>`
  ${({ padding }) => padding && `padding: ${padding}px`};
  ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop}px`};
  ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}px`};
  ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}px`};
  ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight}px`};
  ${({ margin }) => margin && `margin: ${margin}px`};
  ${({ marginTop }) => marginTop && `margin: ${marginTop}px`};
  ${({ marginBottom }) => marginBottom && `margin: ${marginBottom}px`};
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
  ${({ width }) => width && `width: ${typeof width === 'number' ? `${width}px` : width}`};
  ${({ height }) => height && `height: ${typeof height === 'number' ? `${height}px` : height}`};
  ${({ flex }) => flex && `flex: ${flex}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};

`;

const Box: React.FC<BoxProps> = ({ children, style, ...props }) => {
  return <StyledBox style={style} {...props}>{children}</StyledBox>;
};

export default Box;
