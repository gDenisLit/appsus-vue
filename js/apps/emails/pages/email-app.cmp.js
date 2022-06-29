import { emailService } from "../services/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailSide from "../cmps/email-side.cmp.js"

export default {
    template: `

        <section class="flex" >
            <email-side @send="sendEmail"/>
            <email-list @selected="showEmail" :emails="emails"/>
        </section>
    `,
    data() {
        return {
            emails: null,
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
    },
    computed: {
        
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
    },
    // emits: [
    //     'send',
    // ],
}