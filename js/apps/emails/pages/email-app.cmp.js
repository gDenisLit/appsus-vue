import { emailService } from "../services/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailSide from "../cmps/email-side.cmp.js"

export default {
    template: `

        <section class="flex">
            <email-side />
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
}