import emailsData from '../services/data/emails.json' assert { type: 'json' }
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const EMAIL_KEY = 'emailDB'

_createEmails()

export const emailService = {
  query,
  remove,
  get,
  save,
}

function query() {
  return storageService.query(EMAIL_KEY)
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId)
}

function get(emailId) {
  return storageService.get(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) return storageService.put(EMAIL_KEY, email)
  else return storageService.post(EMAIL_KEY, email)
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    emails = emailsData
    utilService.saveToStorage(EMAIL_KEY, emails)
  }
  return emails
}
