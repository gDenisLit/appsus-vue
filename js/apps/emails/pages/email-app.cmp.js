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
            emails: emailService.query(),
            selectedEmail: null
        }
    },
    methods: {
        showEmail(email) {
            this.selectedEmail = email
        },
    },
    computed: {
        
    },
    created() {
        
    },
    unmounted() {
 
    },
    components: {
        emailList,
    },
}