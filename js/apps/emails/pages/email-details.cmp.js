import { emailService } from "../services/email.service.js"
import { editEmailEmit } from "../../../services/eventBus.service.js"
import emailDetailsData from "../cmps/email-details-data.cmp.js"

export default {
    template: `
        <section v-if="email" class="email-details-container" :class="size">
            <button class="back" @click="back">
                <i class="fa-solid fa-arrow-left-long"></i>
                <span>Back</span>
            </button>
            <button class="back" @click="back" v-if="showEdit" @click.stop="editEmail">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Edit</span>
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
        'isSideNav',
    ],
    data() {
        return {
            email: null,
        }
    },
    methods: {
        back() {
            this.$router.push('inbox')
        },
        editEmail() {
            editEmailEmit(this.email)
        },
    },
    computed: {
        size() {
            return {'open-side': (this.isSideNav)}
        },
        showEdit() {
            return (this.email.state === 'draft')
        },
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