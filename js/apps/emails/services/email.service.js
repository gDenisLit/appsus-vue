// import emailsData from '../services/data/emails.json' assert { type: 'json' }
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const EMAIL_KEY = 'emailDB'
const emailsData = [
  {
      id: 'e101',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "momo@momo.com",
      state: 'inbox'
  },
  {
      id: 'e102',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "denis@momo.com",
      state: 'sent'
  },
  {
      id: 'e103',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "guy@momo.com",
      state: 'sent'
  },
  {
      id: 'e104',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "momo@momo.com",
      state: 'inbox'
  },
  {
      id: 'e105',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "googel@momo.com",
      state: 'trash'
  },
  {
      id: 'e106',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "guy@momo.com",
      state: 'inbox'
  },
  {
      id: 'e107',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "momo@momo.com",
      state: 'inbox'
  },
  {
      id: 'e108',
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      to: "momo@momo.com",
      state: 'draft'
  },
  {
      id: 'e109',
      subject: "sdfsdf",
      body: "Wsdfsdfsdfsdfsdfsdf",
      isRead: false,
      sentAt: 1551133930594,
      to: "momo@momo.com",
      state: 'draft'
  },
]
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


