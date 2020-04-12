import React from "react"
import ContainerStyles from "./container.module.css"

function Container({ children }) {
  return <div className={ContainerStyles.container}>{children}</div>
}

export default Container
