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
  addNote,
  switchNotes,
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

function addNote(note) {
  const { type, info, style } = note
  const newNote = {
    type,
    info,
    isPinned: false,
    style: style || {
      backgroundColor: '#495057',
    },
  }

  return save(newNote)
}

function switchNotes({ idx1, idx2 }) {
  return query(NOTES_KEY).then(notes => {
    if (
      (notes[idx1].isPinned && !notes[idx2].isPinned) ||
      (!notes[idx1].isPinned && notes[idx2].isPinned)
    ) {
      console.log(notes[idx1], notes[idx2])
      throw new Error('Cannot switched between pinned and unpinned')
    }

    const temp = notes[idx1]
    notes[idx1] = notes[idx2]
    notes[idx2] = temp

    utilService.saveToStorage(NOTES_KEY, notes)

    return notes
  })
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = notesData
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  return notes
}
