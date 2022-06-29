import { emailService } from "../services/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailSide from "../cmps/email-side.cmp.js"
import emailFilter from "../cmps/email-filter.cmp.js"

export default {
    template: `
        <header>
            <email-filter @onSearch="filter"/>
        </header>
        <section class="flex" >
            <email-side @sort="sortStateEmails" @send="sendEmail"/>
            <email-list @selected="showEmail" 
                @delete="deleteEmail" :emails="emailsToShow"
            />
        </section>
    `,
    data() {
        return {
            emails: null,
            sortState: 'all',
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
            this.emails.splice(idx, 1)
        },
        sortStateEmails(type) {
            this.sortState = type
        },
        filter(txt) {
            this.filterBy = txt
        },
    },
    computed: {
        emailsToShow() {
            if (this.filterBy) {
                return this.emails.filter(email => {
                    email.subject.includes(this.filterBy) 
                    // email.to.includes(this.filterBy) ||
                    // email.body.includes(this.filterBy)
                })
            }
            if (this.sortState === 'all') return this.emails
            if (this.sortState === 'unread') {
                return this.emails.filter(email => !email.isRead)
            }
            return this.emails.filter(email => email.state === this.sortState)
        },
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
    },
    unmounted() {
 
    },
    components: {
        emailList,
        emailSide,
        emailFilter,
    },
}