import { emailService } from "../services/email.service.js"
import { updateEmit, removeEmit } from "../../../services/eventBus.service.js"
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

            <email-details-data :email="email" />

            <div class="details-actions">
                <button class="email-reply" @click="replyEmail">
                    <i class="fa-solid fa-reply"></i>
                    Reply
                </button>
                <button class="email-forward" @click="forwardEmail">
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
            const {subject, body} = this.email
            this.$router.push({
                name: 'compose',
                params: { title: subject || '', body: body || '' },
              })
              removeEmit(this.email.id)
        },
        replyEmail() {
            this.email.body += '\n \n Replay: \n \n'
            const {subject, body, to} = this.email
            this.$router.push({
                name: 'compose',
                params: { title: subject || '', body: body || '', to: to || '', },
              })
        },
        forwardEmail() {
            const {subject, body} = this.email
            this.$router.push({
                name: 'compose',
                params: { title: subject || '', body: body || '' },
              })
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
                        email.isRead = true,
                        this.email = email
                        updateEmit(email)
                    })
            },
            immediate: true,
        }
    },
    components: {
        emailDetailsData,
    },
}