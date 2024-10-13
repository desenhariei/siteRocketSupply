class CarrosselController {
    constructor(model, view, communs, intersection) {
        /* Instanciando model e view */
        this.model = model
        this.view = view
        this.communs = communs
        this.intersection = intersection

        /* Preload das imgs */
        this.imgs = []
        this.model.imgSrc.forEach(val => {
            const imgObject = new Image()
            imgObject.src = val
            this.imgs.push(imgObject)
        })

        /* Pegando elementos */
        this.container = this.communs.getId(model.container)
        this.childs = this.communs.getArray(model.childs)
        this.divs = this.model.divs

        this.currentTime = 0

        this.init()
        requestAnimationFrame(this.animate.bind(this))
    }

    init() {
        /* Pega propriedades */
        this.divs.forEach((val, i) => {
            val.pos0 = this.communs.getArrPosition(this.childs, i, val.direc)
            val.size = this.communs.getSize(this.childs[i], val.direc)

            const path = `url(${this.imgs[i].src})`
            /* Carrega imgs somente quando estão na tela */
            this.intersection.intersection(this.childs[i], this.view.changeBG, this.childs[i], path, 'none')
        })
    }

    animate(tmp) {
        /* Controla o tempo da animação */
        const tmpDelta = tmp - this.currentTime

        /* Variáveis que controlam o inicio e fim da animation */
        const startAnimate = this.communs.getHight(this.container)
        const getWindowHeight = this.communs.getWindowHeight()
        /* Animation */
        if (startAnimate <= getWindowHeight && tmpDelta >= 50) {
            const scroll = this.communs.getDeltaScrollValue()
            this.divs.forEach((val, i) => {
                val.pos = this.communs.getArrPosition(this.childs, i, val.direc)
                val.desloc = this.communs.deslocCtrl(val.sent, val.desloc, val.size, val.vel, scroll)
                this.communs.moveBG(this.childs[i], val.size, val.pos0, val.pos, val.desloc, val.vel, val.direc, val.sent, scroll)
            })
            this.currentTime = tmp
        }
        requestAnimationFrame(this.animate.bind(this))
    }
}