class IntersectionController {
    constructor(model,communs) {
        this.communs = communs
        this.model = model
        this.target = this.communs.getId(this.model.section02)
        this.videos = this.communs.getArray(this.model.section01Videos)
        this.pauseVideos()
    }

    /* Pausa videos depois que a section2 cobre a section01 */
    pauseVideos() {
        window.addEventListener('scroll', () => {
            const height = this.communs.getHight(this.target)
            this.videos.forEach(val => {
                if (height <= 0) {
                    val.pause()
                } else {
                    val.play()
                }
            })
        })
    }

        /* Intersection observe */
        intersection(id, callback, ...args) {
            const observe = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    callback(args[0],args[1])
                }else{callback(args[0],args[2])}
            })
            observe.observe(id)
        }
}