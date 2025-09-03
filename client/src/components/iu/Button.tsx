import React from 'react'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({ children, ...props }: Props): JSX.Element {
  return (
    <button type="submit" className="p-2 w-full dark:hover:bg-blue-500 dark:bg-blue-700 dark:shadow-blue-500/10 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/50 " {...props}>
      {children}
    </button>

  )
}
