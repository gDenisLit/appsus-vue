import booksData from '../data/books.json' assert { type: 'json' }
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const BOOKS_KEY = 'booksDB'
const SEARCH_KEY = 'searchDB'

const gSearchCache = utilService.loadFromStorage(SEARCH_KEY) || {}

_createBooks()

export const bookService = {
  query,
  remove,
  get,
  save,
  addReview,
  removeReview,
  getGoogleBooks,
  addGoogleBook,
  getNeighborsId,
}

function query() {
  return storageService.query(BOOKS_KEY)
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book)
  else return storageService.post(BOOKS_KEY, book)
}

function addReview(bookId, review) {
  return storageService.get(BOOKS_KEY, bookId).then(book => {
    review.id = utilService.makeId(3)
    book.reviews.push(review)
    return save(book)
  })
}

function removeReview(bookId, reviewId) {
  return get(bookId).then(book => {
    const idx = book.reviews.findIndex(review => reviewId === review.id)
    book.reviews.splice(idx, 1)
    return save(book)
  })
}

function getGoogleBooks(keyword) {
  if (gSearchCache[keyword]) return Promise.resolve(gSearchCache[keyword])

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${keyword}`

  return fetch(url)
    .then(res => res.json())
    .then(res => {
      const books = res.items.map(book => _prepareData(book))
      gSearchCache[keyword] = books
      utilService.saveToStorage(SEARCH_KEY, gSearchCache)
      return books
    })
}

function addGoogleBook(book) {
  return storageService.post(BOOKS_KEY, book)
}

function getNeighborsId(bookId) {
  return storageService.query(BOOKS_KEY).then(books => {
    const idx = books.findIndex(book => book.id === bookId)

    const prev = idx > 0 ? books[idx - 1].id : books[books.length - 1].id
    const next = idx < books.length - 1 ? books[idx + 1].id : books[0].id

    return { prev, next }
  })
}

function _prepareData(book) {
  const {
    id,
    volumeInfo: {
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
      imageLinks,
      language,
    },
  } = book

  const newBook = {
    id,
    title,
    subtitle: subtitle || title,
    authors,
    publishedDate,
    description: description || utilService.makeLorem(),
    pageCount,
    categories,
    thumbnail: imageLinks?.thumbnail || '../img/no-thumbnail.jpg',
    language,
    listPrice: {
      amount: 100,
      currencyCode: 'ILS',
      isOnSale: false,
    },
    reviews: [],
  }

  return newBook
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = booksData
    books.forEach(book => (book.reviews = []))
    utilService.saveToStorage(BOOKS_KEY, books)
  }
  return books
}
