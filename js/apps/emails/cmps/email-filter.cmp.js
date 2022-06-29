export default {
    template: `
        <section>
            <input type="search" v-model="filterBy" @input="search">
            <label>
                Date
                <input type="radio" v-model="sortBy.date" >
            </label>
            <!-- <label>
                Title
                <input type="radio" v-model="sortBy.title">
            </label> -->
        </section>
    `,
 
    data() {
        return {
            filterBy: null,
            sortBy: {
                date: null,
                title: null,
            }
        }
    },
    methods: {
        search() {
            this.$emit('onSearch', this.filterBy)
        },
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
}