class FumacaController {
    constructor(model, communs) {
        this.model = model
        this.communs = communs

        /* Pegando os elementos */
        this.fumacas = this.communs.getArray(this.model.container)

        this.currentTmp=0

        this.initProperties()
        this.animate()
    }

    initProperties() {
        /* Atribui valor as propriedades */
        this.model.fumaca.forEach((val, i) => {
            let id = val.id
            val.id = this.communs.getId(id)
            val.size = this.communs.getSize(val.id, val.direc)
            val.posX0 = this.communs.getArrPosition(this.fumacas, i, val.direc)
        })
    }

    animate(tmp) {
        /* Controla o tempo da animação */
        const tmpDelta = tmp - this.currentTmp

        const fumacaHeight = this.communs.getHight(this.fumacas[0])
        const fumacaSizeY = this.communs.getSize(this.fumacas[0], 'Y')
        if (fumacaHeight + fumacaSizeY >= 0 &&tmpDelta>=50) {
            const scroll = this.communs.getDeltaScrollValue()
            this.model.fumaca.forEach((val, i) => {
                /* Atualiza a posição */
                val.position = this.communs.getArrPosition(this.fumacas, i, val.direc)
                this.communs.deslocCtrl(val.sent, val.desloc, val.size, val.vel, scroll)
                this.communs.moveBG(val.id, val.size, val.posX0, val.position, val.desloc, val.vel, val.direc, val.sent, scroll)
            })
            this.currentTmp = tmp
        }


        requestAnimationFrame(this.animate.bind(this))
    }
}