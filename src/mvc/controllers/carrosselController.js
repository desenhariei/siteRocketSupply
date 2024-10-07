class CarrosselController {
    constructor(model, view, communs) {
        /* Instanciando model e view */
        this.model = model
        this.view = view
        this.communs = communs

        /* Atribuindo valores as variáveis com medodos das instancias */
        this.container = view.getId(model.container)
        this.childs = view.getArray(model.childs)
        this.model.divs.forEach((val, i) => {
            val.pos = this.view.getHeight(this.childs, i)
        })
        this.divs = this.model.divs

        this.animate()
    }


    animate() {
        window.addEventListener('scroll', () => {
            this.divs.forEach((val, i) => {
                this.view.animate(this.view.startAnimate(this.container), this.childs, this.divs[i].vel, this.divs[i].pos, this.view.getWindY())
                /* this.communs.moveBG(val,) */
            })

        })
    }
}