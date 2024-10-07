class FumacaView {
    /* Coleta propriedades css */
    getId(id) {
        return document.getElementById(id)
    }
    getPosition(id) {
        return parseInt(window.getComputedStyle(id).backgroundPositionX)
    }
    getSizeX(id) {
        return parseFloat((window.getComputedStyle(id).backgroundSize).split(' ')[0])
    }
}