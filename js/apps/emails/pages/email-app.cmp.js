import { emailService } from "../services/email.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailSide from "../cmps/email-side.cmp.js"
import emailFilter from "../cmps/email-filter.cmp.js"

export default {
    template: `
        <header>
            <email-filter @onSearch="filter"/>
        </header>
        <section class="flex" >
            <email-side />
            <email-list @selected="showEmail" 
                :emails="emailsToShow"
            />
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
            this.emails.splice(idx, 1)
        },
        sort(type) {
            this.sortState = type
        },
        filter(txt) {
            this.filterBy = txt
        },
    },
    computed: {
        emailsToShow() {
            if (!this.emails) return
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
    },
    unmounted() {
 
    },
    components: {
        emailList,
        emailSide,
        emailFilter,
    },
}