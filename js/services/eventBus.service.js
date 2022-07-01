//  2 parmas event name and a listener its a func
function on(eventName, listener) {
  //              a fun that gets the data we send
  const callListener = ({ detail }) => {
    //run the func we got with the data
    listener(detail)
  }
  //put on the window an eventListener to our custom event we created
  window.addEventListener(eventName, callListener) // when the event trigger run our func with the data we pass
  //return a func soo we could remove the listener
  return () => {
    window.removeEventListener(eventName, callListener)
  }
}

//2 params -> eventName and data that we want to pass
function emit(eventName, data) {
  //emit a custom event with the name and the data
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

// we got 2 funcs on and emit
export const eventBus = { on, emit }

export function showUserMsg(msg) {
  emit('show-msg', msg)
}

export function showSuccessMsg(txt) {
  showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
  showUserMsg({ txt, type: 'error' })
}

export function addEmit(entity) {
  emit('added', entity)
}

export function removeEmit(entityId) {
  emit('removed', entityId)
}

export function updateEmit(entity) {
  emit('updated', entity)
}

export function selectEmit(entity) {
  emit('selected', entity)
}

export function filterEmit(entity) {
  emit('filterBy', entity)
}

export function starEmit(entity) {
  emit('starred', entity)
}

export function toggleEmit() {
  console.log('called')
  emit('toggled')
}

export function readEmit(entity) {
  emit('isRead', entity)
}

export function editEmit(entity) {
  emit('edit', entity) 
}