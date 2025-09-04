import type { JSX } from "react"
import type { User } from "../types/Interfaces"

const DahsBoard = ({ zona }: { zona: User }): JSX.Element => {
  const companyname = zona.company
  return(
    <h1>hola mundo {companyname}</h1>
  )
}

export default DahsBoard
