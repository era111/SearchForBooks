import React, { useState, FC, MouseEvent } from "react"
import styles from "./style.module.css"
import cn from "classnames"
import { useNavigate } from "react-router-dom"

interface Props {
  id: string
  imgUrl: string
  title: string
  authors: string[]
  category: string[]
}

const BookCard: FC<Props> = ({ id, imgUrl, title, authors, category }) => {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const categoryFirst = category
    ? category[0].indexOf(" ") === -1
      ? category[0]
      : category[0].slice(0, category[0].indexOf(" "))
    : null

  const clickHandle = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    navigate(`/SearchForBooks/${id}`)
  }

  const handleEnter = () => {
    setHover(true)
  }

  const handleOut = () => {
    setHover(false)
  }

  return (
    <div className={styles.container}>
      <div
        onMouseOver={handleEnter}
        onMouseOut={handleOut}
        className={styles.book_card}
        onClick={clickHandle}
      >
        {categoryFirst && (
          <div className={styles.category}>{categoryFirst}</div>
        )}
        <img className={styles.image} src={imgUrl} alt="" />

        <div className={cn(styles.info, { [styles.hover]: hover })}>
          <div className={styles.item}>{title}</div>
          <div className={styles.item}>{authors.join(" ")}</div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
