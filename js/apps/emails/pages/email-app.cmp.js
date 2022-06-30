import { emailService } from "../services/email.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailSide from "../cmps/email-side.cmp.js"
import emailFilter from "../cmps/email-filter.cmp.js"

export default {
    template: `
      
        <email-filter @search="filter" @sort="sortEmails"/>
        <section class="main-container flex" >
            <email-side />
            <router-view :emails="emailsToShow" @selected="showEmail" />
        </section>
    `,
    data() {
        return {
            emails: null,
            sortState: 'inbox',
            sortBy: null,
            filterBy: null,
        }
    },
    methods: {
        showEmail(emailId) {
            this.$router.push(`/email/${emailId}`)
        },
        sendEmail(email) {
            emailService.save(email)
            .then(email => this.emails.push(email))
        },
        deleteEmail(emailId) {
            emailService.remove(emailId)
            const idx = this.emails.findIndex(email => email.id === emailId)
            const email = this.emails[idx]
            if (email.state !== 'trash') email.state = 'trash'
            else this.emails.splice(idx, 1)
        },
        sort(type) {
            this.sortState = type
        },
        sortEmails({direction}) {
            this.emails.sort((a, b) => {
                if(a.sentAt > b.sentAt) return (direction)? 1 : -1
                else if(a.sentAt < b.sentAt) return (direction)? -1 : 1
                else return 0
            })
        },
        filter(txt) {
            this.filterBy = txt
        },
        startEmail(emailId) {
            const currEmail = this.emails.find(email => email.id === emailId)
            currEmail.starred = !currEmail.starred
            console.log(currEmail)
        },
    },
    computed: {
        emailsToShow() {
            if (!this.emails) return
            if (this.filterBy) {
                return this.emails.filter(email => email.to.includes(this.filterBy))
            }
            if (this.sortState === 'unread') {
                return this.emails.filter(email => {
                    return (!email.isRead && email.state === 'inbox')
                })
            }
            return this.emails.filter(email => email.state === this.sortState)
        },
    },
    created() {
        emailService.query()
        .then(emails => this.emails = emails)

        eventBus.on('removed', this.deleteEmail )
        eventBus.on('added', this.sendEmail)
        eventBus.on('sortBy', this.sort)
        eventBus.on('starred', this.startEmail)
    },
    unmounted() {
 
    },
    components: {
        emailList,
        emailSide,
        emailFilter,
    },
}