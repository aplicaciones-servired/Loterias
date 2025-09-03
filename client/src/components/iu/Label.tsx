import React, { type JSX } from 'react'
type Props = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label ({ children, ...props }: Props): JSX.Element {
  return (
    <label className='font-semibold min-w-max ' {...props}>
      {children}
    </label>
  )
}
