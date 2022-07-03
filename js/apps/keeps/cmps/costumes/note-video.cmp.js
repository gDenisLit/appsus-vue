export default {
  props: ['note'],
  template: `
    <section class="note-video">
      <iframe
         :src="url"
         frameborder="0" allow="accelerometer; autoplay; 
         encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen>
      </iframe> 
      <h4>{{ info.title }}</h4>
    </section>
    `,
  computed: {
    url() {
      return 'https://www.youtube.com/embed/' + this.info.videoId
    },
    info() {
      return this.note.info
    },
  },
}
