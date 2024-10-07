class FumacaController {
    constructor(model, view, communs) {
        this.model = model
        this.view = view
        this.communs = communs

        this.initProperties()
        this.animate()
    }

    initProperties() {
        window.addEventListener('scroll', () => {
            this.communs.getDeltaScroll()
        })

        /* Atribui valor as propriedades */
        this.model.fumaca.forEach(val => {
            let id = val.id
            val.id = this.view.getId(id)
            val.size = this.view.getSizeX(val.id)
            val.posX0 = this.view.getPosition(val.id)
        })
    }

    animate() {
        this.model.fumaca.forEach(val => {
            /* Atualiza a posição */
            val.position = this.view.getPosition(val.id)
            this.communs.deslocCtrl(val.sent, val.desloc, val.size, val.vel, this.communs.getDeltaScrollValue())
            this.communs.moveBG(val.id, val.size, val.posX0, val.position, val.desloc, val.vel, val.direc, val.sent, this.communs.getDeltaScrollValue())
        })

        requestAnimationFrame(this.animate.bind(this))
    }
}