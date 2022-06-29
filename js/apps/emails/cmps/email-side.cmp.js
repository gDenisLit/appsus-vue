import emailCompose from "./email-compose.cmp.js"
import emailSideSort from "./email-side-sort.cmp.js"

export default {
    template: `
        <section class="side-nav flex column">
            <button class="email-compose" 
                @click="composeMode">
                +Compose
            </button>
            <email-side-sort @sort="setSort"/>
        </section>

        <section v-if="compose" >
            <email-compose @newEmail="sendNewEmail"/>
        </section>
    `,
    data() {
        return {
            compose: false,
            sortBy: null,
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
        setSort(type) {
            this.$emit('sort', type)
        },
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
    emits: [
        'send',
        'sort',
    ],
    components: {
        emailCompose,
        emailSideSort,
    },
}