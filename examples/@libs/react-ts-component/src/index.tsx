import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from 'react';

const cardClassName = 'card';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  width: number;
  height: number;
}

function Card(props: CardProps, ref?: ForwardedRef<HTMLDivElement>) {
  return <div className={cardClassName} {...props} ref={ref} />;
}

const Component = forwardRef(Card);

export { Component as Card };
