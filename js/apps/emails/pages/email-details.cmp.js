import { eventBus } from '../../../services/eventBus.service.js'
import { emailService } from "../services/email.service.js"
import emailDetailsData from "../cmps/email-details-data.cmp.js"

export default {
    template: `
        <section v-if="email" class="email-details-container" :class="size">
            <button class="back" @click="back">
                <i class="fa-solid fa-arrow-left-long"></i>
                <span>Back</span>
            </button>
            <email-details-data :email="email"/>
            <div class="details-actions">
                <button class="email-reply">
                    <i class="fa-solid fa-reply"></i>
                    Reply
                </button>
                <button class="email-forward">
                    Forward
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </section>
    `,
    props: [
       
    ],
    data() {
        return {
            email: null,
            isSideNav: false,
        }
    },
    methods: {
        back() {
            this.$router.push('inbox')
        },
        toggleSideNav() {
            this.isSideNav = !this.isSideNav
        },
    },
    computed: {
        size() {
            return {'open-side': (this.isSideNav)}
        }
    },
    created() {
        eventBus.on('toggled', this.toggleSideNav)
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