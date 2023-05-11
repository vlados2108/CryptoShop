import React, { Dispatch, SetStateAction } from 'react'
import "../styles/modal.scss"

interface IProps{
    active:boolean,
    setActive:Dispatch<SetStateAction<boolean>>,
    children:React.ReactNode
}

export default function Modal(props:IProps) {
  return (
    <div className={props.active? "modal active" : "modal"} onClick={()=>{props.setActive(false)}}>
        <div className={props.active? "modalContent active" : "modalContent"} onClick={e=>e.stopPropagation()}>
            {props.children}
        </div>
    </div>
  )
}
