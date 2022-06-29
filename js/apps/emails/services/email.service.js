import emailsData from '../services/data/emails.json' assert { type: 'json' }
export const emailService = {
    query,
    get,
}

var gEmails = emailsData

function query() {
    return gEmails
}

function get(emailId) {
    console.log(emailId)
    return gEmails.find(email => email.id === emailId)
}