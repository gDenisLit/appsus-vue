import { emailService } from "../services/email.service.js"
import emailDetailsData from "../cmps/email-details-data.cmp.js"

export default {
    template: `
        <section v-if="email">
          <email-details-data :email="email"/>
        </section>
    `,
    props: [
       
    ],
    data() {
        return {
            email: null,
        }
    },
    methods: {
           
    },
    computed: {
        
    },
    created() {
      
    },
    mounted() {

    },
    unmounted() {
 
    },
    watch: {
        '$route.params.emailId': {
            handler() {
                const { emailId } = this.$route.params
                if (!emailId) return 
                emailService.get(emailId)
                    .then(email => {
                        this.email = email
                        email.isRead = true
                        emailService.save(email)
                    })
            },
            immediate: true,
        }
    },
    components: {
        emailDetailsData,
    },
}