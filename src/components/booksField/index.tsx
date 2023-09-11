import React, { FC } from "react"
import styles from "./style.module.css"
import BookCard from "../bookCard"
import SkeletonCard from "../../shared/Skeleton"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store/store"

const urlImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019"

interface BookInfo {
  id: string
  etag: string
  volumeInfo: {
    imageLinks: { smallThumbnail: string } | undefined
    title: string | undefined
    authors: string[] | undefined
    categories: string[]
  }
}

const Books: FC = () => {
  const books = useSelector((state: RootState) => state.books.books)
  const totalItems = useSelector((state: RootState) => state.books.total)
  const isLoading = useSelector((state: RootState) => state.settings.loading)

  return (
    <>
      <div className={styles.count}>
        <span>Found {totalItems} results</span>
      </div>

      <div className={styles.container}>
        {isLoading ? (
          books?.map((book) => {
            const { id, etag, volumeInfo } = book as BookInfo

            return (
              <BookCard
                key={etag}
                id={id}
                imgUrl={volumeInfo.imageLinks?.smallThumbnail || urlImage}
                title={volumeInfo.title || ""}
                authors={volumeInfo.authors || [""]}
                category={volumeInfo.categories}
              ></BookCard>
            )
          })
        ) : (
          <>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
          </>
        )}
      </div>
    </>
  )
}

export default Books
