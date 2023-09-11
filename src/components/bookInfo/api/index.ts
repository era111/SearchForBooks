

export async function getBook(id: string) {
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
  try {
      const promise = await fetch(url)
      const data = await promise.json()      
      return data
    
  } catch (error) {
     console.log(error)
  }
}
