class FadeInController {
    constructor(model, view, commun) {
        this.model = model
        this.view = view
        this.commun = commun

        this.lastScroll = 0

        /* Texts variáveis */
        this.textId = this.model.texts
        this.textsProp = this.model.textsProp
        this.texts = this.commun.getArray(this.textId)

        /* Imgs variáveis */
        this.imgId = this.model.imgs
        this.imgsProp = this.model.imgsProp
        this.imgs = this.commun.getArray(this.imgId)

        requestAnimationFrame(this.animate.bind(this))
    }

    /* Retora um booleano para quando o objeto esta visivel */
    isVisible(id) {
        const height = this.commun.getHight(id)
        const windHeight = this.commun.getWindowHeight()

        return height <= windHeight * 0.8 && height >= windHeight * 0.1
    }

    animate() {
        const scroll = this.commun.getScroll()
        /* Garante que só será executada caso haja variação no scroll */
        if (this.lastScroll != scroll) {
            this.lastScroll = scroll

            this.texts.forEach(val => {
                this.view.fadeIn(val, this.isVisible(val), this.textsProp.direc, this.textsProp.valueIT, this.textsProp.valueFT, this.textsProp.valueIO, this.textsProp.valueFO)
            })
            this.imgs.forEach(val => {
                this.view.fadeIn(val, this.isVisible(val), this.imgsProp.direc, this.imgsProp.valueIT, this.imgsProp.valueFT, this.imgsProp.valueIO, this.imgsProp.valueFO)
            })
        }
        requestAnimationFrame(this.animate.bind(this))
    }
}
