import notesData from '../data/notes.json' assert { type: 'json' }
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTES_KEY = 'notesDB'

_createNotes()

export const keepService = {
  query,
  remove,
  get,
  save,
  changeNoteBgc,
}

function query() {
  return storageService.query(NOTES_KEY)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note)
  else return storageService.post(NOTES_KEY, note)
}

function changeNoteBgc({ color, noteId }) {
  return get(noteId).then(note => {
    note.style.backgroundColor = color
    return save(note)
  })
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = notesData
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  console.log(notes)
  return notes
}
