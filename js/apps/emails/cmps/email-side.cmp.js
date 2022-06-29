import emailCompose from "./email-compose.cmp.js"
import emailSideSort from "./email-side-sort.cmp.js"

export default {
    template: `
        <section class="side-nav flex column">
            <button class="email-compose" 
                @click="composeMode">+Compose
            </button>
            <email-side-sort />
        </section>
        
        <section v-if="compose" >
            <email-compose @newEmail="sendNewEmail"/>
        </section>
    `,
    data() {
        return {
            compose: false,
        }
    },
    methods: {
        sendNewEmail(newEmail) {
            this.$emit('send', newEmail)
            this.compose = !this.compose
        },
        composeMode() {
            this.compose = !this.compose
        },
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
    emits: [
        'send'
    ],
    components: {
        emailCompose,
        emailSideSort,
    },
}