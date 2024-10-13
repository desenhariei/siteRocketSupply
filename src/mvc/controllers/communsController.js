class CommunsController {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.getDeltaScroll()
    }

    /* Get elements */
    getId(id) {
        return this.view.getId(id)
    }

    getArray(id) {
        return this.view.getArray(id)
    }

    /* Get properties */
    getArrPosition(id, indice, direc) {
        return this.view.getArrPosition(id, indice, direc)
    }

    getSize(id, direc) {
        return this.view.getSize(id, direc)
    }

    getHight(id) {
        return this.view.getHight(id)
    }

    getWindowHeight() {
        return this.view.getWindowHeight()
    }

    /* Animações de descolcamento com scroll */
    moveBG(x, tamX, posX0, posAtual, desloc, vel, direc, sent, scroll) {
        this.view.moveBG(x, tamX, posX0, posAtual, desloc, vel, direc, sent, scroll)
    }
    deslocCtrl(sent, desloc, size, vel, deltaScroll) {
        return this.view.deslocCtrl(sent, desloc, size, vel, deltaScroll)
    }

    /* Integra o model */
    getDeltaScrollValue() {
        return this.model.windowAltVariat
    }

    /* Atualiza valor do scroll */
    getDeltaScroll() {
        window.addEventListener('scroll', () => {
            this.model.calcDeltaScroll()
            let isScrolling
            clearInterval(isScrolling)
            isScrolling = setInterval(() => {
                this.model.resetScroll()
            }, this.model.lastRender)
        })
    }
    getScroll() {
        return this.model.windowAltAgora
    }

}