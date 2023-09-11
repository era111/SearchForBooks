import { MAX_RESULT } from "../consts/index"

export default async function getBooks(
  contained: string,
  category: string,
  order: string,
  startIndex: number = 0
) {
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${contained}${
    category === "all" ? "" : `+subject:${category}`
  }&startIndex=${startIndex}&maxResults=${MAX_RESULT}&orderBy=${order}&key=${API_KEY}`

  try {
    const promise = await fetch(url)
    const data = await promise.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
