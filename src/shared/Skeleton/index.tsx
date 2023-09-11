import React from "react"
import styles from "./style.module.css"
import cn from "classnames"

const SkeletonCard = () => {

  return (
    <div className={styles.container}>
      <div className={styles.book_card}>
        <span className={styles.skeleton_image}></span>
        <span className={cn(styles.skeleton_text)}></span>
        <span className={cn(styles.skeleton_text, styles.secondary)}></span>
      </div>
    </div>
  )
}

export default SkeletonCard
