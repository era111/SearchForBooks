import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react"
import styles from "./style.module.css"
import cn from "classnames"
import Books from "../booksField"
import getBooks from "./api"
import { Categories, MAX_RESULT, Sorts } from "./consts/index"
import { useDispatch, useSelector } from "react-redux"
import {
  addBooks,
  refreshBooks,
  setTotalItems,
} from "../../app/store/slices/books"
import { setLoading } from "../../app/store/slices/loading"
import { RootState } from "../../app/store/store"

const Header = () => {
  const [searchLine, setSearchLine] = useState("")
  const [contained, setContained] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("relevance")
  const [books, setBooks] = useState(
    useSelector((state: RootState) => state.books.books)
  )

  const dispatch = useDispatch()

  const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleSelectSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
    const { key } = event
    if (key === "Enter") {
      setContained(searchLine)
    }
  }

  const getResult = async (startIndex: number = 0) => {
    const newbooks = await getBooks(contained, category, sort, startIndex)
    dispatch(addBooks(newbooks.items))
    dispatch(setTotalItems(newbooks.totalItems))
    dispatch(setLoading(true))
  }

  const loadMoreBooks = () => {
    const startIndex = books.length + MAX_RESULT
    getResult(startIndex)
  }

  useEffect(() => {
    dispatch(refreshBooks())
    dispatch(setLoading(false))
    getResult()
  }, [contained, category, sort])

  return (
    <div className={styles.header}>
      <div className={styles.title}>Search for books</div>
      <div className={styles.container}>
        <div className={cn(styles.search, styles.item)}>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchLine(e.target.value)}
            value={searchLine}
            onKeyDown={handleKeyPress}
          ></input>
          <button onClick={() => setContained(searchLine)}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className={cn(styles.categories, styles.item)}>
          <span>categories</span>
          <select onChange={handleSelectCategory}>
            {Object.values(Categories).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>

        <div className={cn(styles.sortby, styles.item)}>
          <span>sortby</span>
          <select onChange={handleSelectSort}>
            {Object.values(Sorts).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className={styles.count}>
        <span>
          Your settings: '{category}' sort by '{sort}' contained '
          {contained ? contained : "empty"}'
        </span>
      </div>
      <Books></Books>
      <div className={styles.button}>
        <button onClick={loadMoreBooks}>Load more</button>
      </div>
    </div>
  )
}

export default Header
