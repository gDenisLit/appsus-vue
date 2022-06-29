import { emailService } from "../services/email.service.js"
import emailPreview from "../cmps/email-preview.cmp.js"

export default {
    template: `
        <section v-for="email in emails">
            <email-preview :email="email"/>
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
        emailPreview,
    },
}