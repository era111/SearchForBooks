import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./style.module.css"
import BreadCrumbs from "../../shared/breadcrumbs"

import { getBook } from "./api"
import { addBook } from "../../app/store/slices/book"
import { useDispatch } from "react-redux"

interface Book {
  volumeInfo: {
    imageLinks: { thumbnail: string }
    title: string
    authors: string[]
    categories: string[]
    description: string
  }
}

const BookInfo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [book, setBook] = useState<Book | undefined>()

  async function getResult() {
    if (id) {
      const book: Book = await getBook(id)
      dispatch(addBook(book))
      setBook(book)
      return book
    }
  }

  useEffect(() => {
    getResult()
  }, [])

  return (
    <div className={styles.container}>
      {book && (
        <div className={styles.card}>
          <BreadCrumbs links={[{ title: "Home", to: "/" }]}></BreadCrumbs>
          <div className={styles.book}>
            <div className={styles.image}>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt=""></img>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{book.volumeInfo.title}</div>
              <div className={styles.bookinfo}>
                {"Authors: "}
                <span>{book.volumeInfo.authors?.join(", ")}</span>
              </div>
              <div className={styles.bookinfo}>
                {"Categories: "}
                <span>{book.volumeInfo.categories}</span>
              </div>
              <div className={styles.description}>
                {book.volumeInfo.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookInfo
