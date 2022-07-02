import { emailService } from '../services/email.service.js'
import { eventBus, showSuccessMsg } from '../../../services/eventBus.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'

export default {
  template: `
      <div class="app">
            <email-filter @search="setSearch" @sort="sortEmails"/>
            <section class="flex">
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
        state: null,
        starred: false,
      },
      isSideOpen: false,
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
      emailService.remove(emailId)
      .then(() => {
        const idx = this.emails.findIndex(email => email.id === emailId)
        const email = this.emails[idx]
        if (email.state !== 'trash') email.state = 'trash'
        else this.emails.splice(idx, 1)  
      })
    },
    updateEmail(newEmail) {
      console.log('updating email starred...', newEmail)
      emailService.save(newEmail).then(newEmail => {
        const idx = this.emails.findIndex(email => email.id === newEmail.id)
        this.emails.splice(idx, 1, newEmail)
        console.log('updated...')
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
    setSearch(txt) {
      this.filterBy.txt = txt
    },
    starEmail(email) {
      emailService.save(email).then(email => {
        const idx = this.emails.findIndex(oldEmail => oldEmail.id === email.id)
        this.emails.splice(idx, 1, email)
      })
    },
    toggleSideNav() {
      this.isSideOpen = !this.isSideOpen
    },
  },
  computed: {
    emailsToShow() {
      if (!this.emails) return
      let emails = this.emails
      const { txt, state, starred } = this.filterBy

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

    eventBus.on('added', this.sendEmail)
    eventBus.on('removed', this.deleteEmail)
    eventBus.on('updated', this.updateEmail)
    eventBus.on('toggled', this.toggleSideNav)
  },
  unmounted() {},
  components: {
    emailList,
    emailSide,
    emailFilter,
  },
  emits: ['filtered'],
}
