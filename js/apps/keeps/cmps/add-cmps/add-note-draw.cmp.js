import { addNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  template: `
          <div class="screen" @click="this.$emit('added')"></div>
        <section class="note-add-draw">
            <input class="input" type="text"
                v-model="note.info.title"
              placeholder="Pick a title first">
              <div class="options-bar">
                <input type="color" name="color" v-model="bgColor" />
                <input type="color" name="color" v-model="color" />
                <span @click="clearCanvas">Clear</span>
            </div>
            <div class="canvas-container">
              <canvas 
              ref="canvas" 
              class="canvas" 
              width="500" 
              height="500"
              @mousemove="draw"
              @mousedown="startDrawing"
              @mouseup="stopDrawing"
              ></canvas>
            </div>
            
            <button class="btn" @click="addNote">Save</button>
          
        </section>
    `,
  data() {
    return {
      note: {
        type: 'note-img',
        info: {
          url: '',
          title: '',
        },
        canvas: null,
        ctx: null,
        isDrawing: false,
      },
      color: '#000000',
      bgColor: '#ffffff',
    }
  },
  created() {},
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.clearCanvas()
  },
  watch: {
    color(newVal) {
      console.log(newVal)
      this.ctx.strokeStyle = newVal
    },
    bgColor(newVal) {
      this.ctx.fillStyle = newVal
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
  },
  methods: {
    addNote() {
      this.note.info.url = this.canvas.toDataURL('image/jpeg')
      addNoteEmit(this.note)
      this.$emit('added')
    },
    startDrawing(ev) {
      this.isDrawing = true

      this.draw(ev)
    },
    stopDrawing() {
      this.isDrawing = false
      this.ctx.beginPath()
    },
    draw(ev) {
      if (!this.isDrawing) return

      const { x, y } = this.getEvPos(ev)

      this.drawLine(x, y)
    },
    drawLine(x, y) {
      this.ctx.lineWidth = 3
      this.ctx.lineCap = 'round'

      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.moveTo(x, y)
    },
    clearCanvas() {
      this.ctx.fillStyle = this.bgColor
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    getEvPos(ev) {
      //Gets the offset pos , the default pos
      var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
      }
      // Check if its a touch ev
      // if (this.touchEvs.includes(ev.type)) {
      //   //soo we will not trigger the mouse ev
      //   ev.preventDefault()
      //   //Gets the first touch point
      //   ev = ev.changedTouches[0]
      //   //Calc the right pos according to the touch screen
      //   pos = {
      //     x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      //     y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      //   }
      // }
      return pos
    },
  },
  computed: {},
  unmounted() {},
}
