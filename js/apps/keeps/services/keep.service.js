// import notesData from '../data/notes.json' assert { type: 'json' }
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
    notes = [
      {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Make me rich! 🙏',
        },
        style: {
          backgroundColor: '#495057',
        },
        labels: [{ title: 'Critical', color: '#e03131' }],
      },
      {
        id: 'n102',
        type: 'note-todos',
        isPinned: true,
        info: {
          title: 'Win sprint 3',
          todos: [
            {
              id: '1',
              txt: 'Avoid shit in the code',
              isDone: false,
              doneAt: null,
            },
            {
              id: '2',
              txt: 'Resolve food from wolt',
              isDone: true,
              doneAt: 187111111,
            },
            {
              id: '3',
              txt: 'Catch brain errors',
              isDone: false,
              doneAt: 187111111,
            },
            {
              id: '4',
              txt: 'Remember to shower',
              isDone: true,
              doneAt: 187111111,
            },
          ],
        },
        style: {
          backgroundColor: '#40c057',
        },
      },
      {
        id: 'n103',
        type: 'note-img',
        isPinned: false,
        info: {
          url: 'https://media0.giphy.com/media/Hld1RfHBeQDmM/giphy.gif?cid=ecf05e47oja2qakbdabac72p1kj31udw7j8ihd0bdeeag1fo&rid=giphy.gif&ct=g',
          title: 'Satruday evening',
        },
        style: {
          backgroundColor: '#228be6',
        },
      },
      {
        id: 'n104',
        type: 'note-audio',
        isPinned: false,
        info: {
          url: 'assets/audio/forest-lullaby.mp3',
          title: 'Relaxing Forest lullaby',
        },
        style: {
          backgroundColor: '#f03e3e',
        },
        labels: [
          { title: 'Memories', color: '#ae3ec9' },
          { title: 'Romantic', color: '#1098ad' },
        ],
      },
      {
        id: 'n105',
        type: 'note-img',
        isPinned: false,
        info: {
          url: 'https://media3.giphy.com/media/ovxc9FB6VCBJC/giphy.gif?cid=ecf05e47usa0c4l3zo31bhkq41e2jsod8hbjswoxqqojiu93&rid=giphy.gif&ct=g',
          title: 'Add note type: <note-map>',
        },
        style: {
          backgroundColor: '#ff922b',
        },
      },
      {
        id: 'n106',
        type: 'note-txt',
        isPinned: false,
        info: {
          title: 'Check out the paintbrush',
          txt: 'I owned the canvas',
        },
        style: {
          backgroundColor: '#fcc419',
        },
        labels: [{ title: 'Spam', color: '#f76707' }],
      },
      {
        id: 'n107',
        type: 'note-img',
        isPinned: false,
        info: {
          url: 'https://memegenerator.net/img/instances/47086717.jpg',
          title: 'Sprint 2 be like',
        },
        style: {
          backgroundColor: '#7950f2',
        },
      },
      {
        id: 'n108',
        type: 'note-todos',
        isPinned: false,
        info: {
          title: "What's next...",
          todos: [
            {
              id: '1',
              txt: "Figure out Vue's warnings 😥",
              isDone: false,
              doneAt: null,
            },
            {
              id: '2',
              txt: 'Sleep in september',
              isDone: true,
              doneAt: 187111111,
            },
            {
              id: '3',
              txt: 'Remember we can walk',
              isDone: false,
              doneAt: 187111111,
            },
          ],
        },
        style: {
          backgroundColor: '#ff922b',
        },
        labels: [{ title: 'Work', color: '#37b24d' }],
      },
      {
        id: 'n109',
        type: 'note-txt',
        isPinned: false,
        info: {
          title: 'Try to drag me',
          txt: 'but not on a pinned note 🙊',
        },
        style: {
          backgroundColor: '#f06595',
        },
      },
      {
        id: 'n110',
        type: 'note-video',
        isPinned: false,
        info: {
          videoId: 'bpOSxM0rNPM',
        },
        style: {
          backgroundColor: '#15aabf',
        },
      },
    ]

    const pinned = notes.filter(note => note.isPinned)
    const unpinned = notes.filter(note => !note.isPinned)

    notes = [...pinned, ...unpinned]

    utilService.saveToStorage(NOTES_KEY, notes)
  }
  return notes
}
