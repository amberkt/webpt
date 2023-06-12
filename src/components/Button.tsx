import React from "react"
import "./Button.css" // Import CSS for the button component

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

/**
 * Accepting onClick, disabled, and children as props. The button is rendered using the children prop.
 * 
 */

export default Button
