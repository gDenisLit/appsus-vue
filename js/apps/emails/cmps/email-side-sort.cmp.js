import { sortEmit } from "../../../services/eventBus.service.js"

export default {
    template: `
        <button class="nav-btn" @click="sort('inbox')">Inbox</button>
        <button class="nav-btn" @click="sort('unread')">Unread</button>
        <button class="nav-btn" @click="sort('sent')">Sent</button>
        <button class="nav-btn" @click="sort('draft')">Drafts</button>
        <button class="nav-btn" @click="sort('trash')">Trash</button>
    `,
    data() {
        return {}
    },
    methods: {
        sort(type) {
            sortEmit(type)
        },  
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
    emits: [
        'sort'
    ]
}