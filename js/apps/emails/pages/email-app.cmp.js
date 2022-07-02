import { emailService } from '../services/email.service.js'
import { eventBus, showSuccessMsg } from '../../../services/eventBus.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'

export default {
  template: `
      <div class="app">
            <email-filter @search="setSearch" @sort="sortEmails"/>
            <section class="email-app flex">
                <email-side @filtered="setFilter" :unreadCount="unreadCount"/>
                <router-view :emails="emailsToShow" @selected="showEmail" :isSideNav="isSideOpen"/>
            </section>
        </div>
    `,
  data() {
    return {
      emails: null,
      sortBy: null,
      filterBy: {
        txt: null,
        to: null,
        subject: null,
        body: null,
        dateFrom: null,
        dateTo: null,
        state: 'inbox',
        starred: false,
      },
      isSideOpen: false,
      unsubAdd: null,
      unsubRemove: null,
      unsubUpdate: null,
    }
  },
  methods: {
    showEmail(emailId) {
      this.$router.push(`/email/${emailId}`)
    },
    sendEmail(email) {
      emailService.save(email).then(email => {
        this.emails.push(email)
        if (email.state === 'sent') showSuccessMsg('Message Sent')
        if (email.state === 'draft') showSuccessMsg('Saved to Drafts')
      })
    },
    deleteEmail(emailId) {
      const email = this.emails.find(email => email.id === emailId)
      if (email.state !== 'trash') {
        email.state = 'trash'
        showSuccessMsg('Moved To Trash')
      } else {
        emailService.remove(emailId)
        .then(() => {
          const idx = this.emails.findIndex(email => email.id === emailId)
          this.emails.splice(idx, 1)
          showSuccessMsg('Permanently Removed')
        })
    }
    },
    updateEmail(newEmail) {
      emailService.save(newEmail).then(newEmail => {
        const idx = this.emails.findIndex(email => email.id === newEmail.id)
        this.emails.splice(idx, 1, newEmail)
      })
    },
    sortEmails({ direction }) {
      this.emails.sort((a, b) => {
        if (a.sentAt > b.sentAt) return direction ? 1 : -1
        else if (a.sentAt < b.sentAt) return direction ? -1 : 1
        else return 0
      })
    },
    setFilter({ state, starred }) {
      this.filterBy.state = state
      this.filterBy.starred = starred
    },
    setSearch({txt, to, subject, body, dateFrom, dateTo}) {
      this.filterBy.txt = txt
      this.filterBy.to = to
      this.filterBy.subject = subject
      this.filterBy.body = body
      this.filterBy.dateFrom = +new Date(dateFrom)
      this.filterBy.dateTo = +new Date(dateTo)
    },
    toggleSideNav() {
      this.isSideOpen = !this.isSideOpen
    },
  },
  computed: {
    emailsToShow() {
      if (!this.emails) return
      let emails = this.emails
      const { txt, to, subject, 
              body, state, starred,
              dateFrom, dateTo} = this.filterBy

      if (txt) {
        const regex = new RegExp(txt, 'i')
        emails = emails.filter(email => {
          return (
            regex.test(email.to) ||
            regex.test(email.subject) ||
            regex.test(email.body)
          )
        })
      }

      if (to) {
        const regex = new RegExp(to, 'i')
        emails = emails.filter(email => regex.test(email.to))
      }

      if (subject) {
        const regex = new RegExp(subject, 'i')
        emails = emails.filter(email => regex.test(email.subject))
      }

      if (body) {
        const regex = new RegExp(body, 'i')
        emails = emails.filter(email => regex.test(email.body))
      }

      if (dateFrom) {
        emails = emails.filter(email => email.sentAt > dateFrom)
      }

      if (dateTo) {
        console.log(dateTo)
        emails = emails.filter(email => email.sentAt < dateTo)
      }

      if (state) {
        emails = emails.filter(email => email.state === state)
      }
      if (starred) emails = emails.filter(email => email.starred)
      return emails
    },
    unreadCount() {
      if (!this.emails) return
      return this.emails.reduce((acc, email) => {
        return email.isRead ? acc : acc + 1
      }, 0)
    },
  },
  created() {
    emailService.query().then(emails => (this.emails = emails))

    eventBus.on('toggled', this.toggleSideNav)
    this.unsubAdd = eventBus.on('added', this.sendEmail)
    this.unsubRemove = eventBus.on('removed', this.deleteEmail)
    this.unsubUpdate = eventBus.on('updated', this.updateEmail)
  },
  unmounted() {
    this.unsubAdd()
    this.unsubRemove()
    this.unsubUpdate()
  },
  components: {
    emailList,
    emailSide,
    emailFilter,
  },
  emits: ['filtered'],
}
