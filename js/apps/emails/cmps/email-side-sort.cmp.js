export default {
    template: `
        <button class="nav-btn" @click="sort('all')">Inbox</button>
        <button class="nav-btn" @click="sort('unread')">Unread</button>
        <button class="nav-btn" @click="sort('sent')">Sent</button>
        <button class="nav-btn" @click="sort('drafts')">Drafts</button>
        <button class="nav-btn" @click="sort('drafts')">Trash</button>
    `,
 
    data() {
        return {}
    },
    methods: {
        sort(type) {
            this.$emit('sortBy', type)
        }   
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
}