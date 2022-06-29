import { emailService } from "../services/email.service.js"
import emailList from "../cmps/email-list.cmp.js"

export default {
    template: `

        <section>
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
    },
}