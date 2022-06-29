import { emailService } from "../services/email.service.js"

export default {
    template: `
        
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
        console.log(this.emails)
    },
    unmounted() {
 
    },
}