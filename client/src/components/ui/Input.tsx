import React from 'react'
import type { JSX } from "react/jsx-runtime";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input ({ ...props }: Props): JSX.Element {
  return (
    <input className='p-2 w-full min-w-max rounded-lg border-none outline-none'
      {...props} />
  )
}
