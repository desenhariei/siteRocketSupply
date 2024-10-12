class CommunsModel {
    constructor() {
        /* Variáveis locais de controle interno */
        this.windowAltAgora = 0
        this.windowUltimoAlt = 0
        this.windowAltVariat = 0
        this.lastRender = 100
    }

    /* Coleta a variação do scrollY */
    calcDeltaScroll() {
        this.windowAltAgora = window.scrollY
        this.windowAltVariat = this.windowAltAgora - this.windowUltimoAlt
        this.windowUltimoAlt = this.windowAltAgora
    }

    /* Garante que seja pego apenas a variação do scroll */
    resetScroll() {
        this.windowAltVariat = 0
    }
}