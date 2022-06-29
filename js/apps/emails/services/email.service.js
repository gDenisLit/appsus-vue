import emailsData from '../services/data/emails.json' assert { type: 'json' }
export const emailService = {
    query,
}

function query() {
    return emailsData
}

