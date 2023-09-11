import React, { FC } from "react"
import { Link, } from "react-router-dom"
import styles from "./style.module.css"

interface Props {
  links: { title: string; to: string }[]
}

const BreadCrumbs: FC<Props> = ({ links }) => {

  return (
    <div>
      {links.map((link, index) => {
        return (
          <React.Fragment key={link.title}>
            <span>{index ? "/ " : ""}</span>
            <Link
              className={styles.link}
              key={link.title}
              color="rgba(148, 148, 184, 0.4)"
              to={link.to}
            >
              {link.title.toUpperCase()}
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrumbs
