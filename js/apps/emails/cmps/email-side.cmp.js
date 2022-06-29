import emailCompose from "./email-compose.cmp.js"

export default {
    template: `
        <section class="side-nav flex column">
            <button @click="composeMode" class="email-compose">+Compose</button>
            <button class="nav-btn">Inbox</button>
            <button class="nav-btn">Starred</button>
            <button class="nav-btn">Sent</button>
            <button class="nav-btn">Drafts</button>
            <button class="nav-btn">Trash</button>
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
            console.log(newEmail)
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
    },
}