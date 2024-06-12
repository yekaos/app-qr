import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"

function BtnSecondary({ onClick, children }) {
  return (
    <button className="btnSecondary animationFundido" onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}

export default BtnSecondary