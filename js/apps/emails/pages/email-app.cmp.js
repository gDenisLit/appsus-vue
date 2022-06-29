import { emailService } from "../services/email.service.js"
import emailList from "../cmps/email-list.cmp.js"

export default {
    template: `
        <section>
            <email-list :emails="emails"/>
        </section>
    `,
    data() {
        return {
            emails: emailService.query()
        }
    },
    methods: {
           
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