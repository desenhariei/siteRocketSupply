class CommunsController {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    /* Integra o view */
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

    getDeltaScroll() {
        this.model.calcDeltaScroll()
        let isScrolling
        clearInterval(isScrolling)
        isScrolling = setInterval(() => {
            this.model.resetScroll()
        }, this.model.lastRender)
    }
}