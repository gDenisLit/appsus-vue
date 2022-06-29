import notesData from '../data/notes.json' assert { type: 'json' }
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'

_createNotes()

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = booksData
    books.forEach(book => (book.reviews = []))
    utilService.saveToStorage(BOOKS_KEY, books)
  }
  return books
}
