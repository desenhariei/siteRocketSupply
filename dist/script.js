document.addEventListener('DOMContentLoaded', () => {
    /* Inicialização Communs */
    const communsModel = new CommunsModel
    const communsView = new CommunsView
    const communsController = new CommunsController(communsModel, communsView)

    /* Inicialização Fumaça */
    const fumacaModel = new FumacaModel
    const fumacaView = new FumacaView
    new FumacaController(fumacaModel, fumacaView, communsController)

    /* Inicialização Carossel */
    const carrosselModel = new CarrosselModel
    const carrosselView = new CarrosselView
    new CarrosselController(carrosselModel, carrosselView, communsController)
})
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
class CarrosselModel {
    constructor() {
        this.divs = [
            { vel: 2 },
            { vel: 0 },
            { vel: 2 },
            { vel: 0 }
        ]

        this.container = 'section03'
        this.childs = '#section03>div'
    }
}
class CommunsModel {
    constructor() {
        /* Variáveis locais de controle interno */
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
class FumacaModel {
    constructor() {
        /* Elementos manipulados e suas propriedades */
        this.fumaca = [
            {
                id: 'fumacaBase01Home',
                vel: 2.5,
                direc: 'X',
                sent: 'direita',
                desloc: 0
            },
            {
                id: 'fumacaBase02Home',
                vel: 1.25,
                direc: 'X',
                sent: 'direita',
                desloc: 0
            },
            {
                id: 'fumacaBase03Home',
                vel: -0.5,
                direc: 'X',
                sent: 'esquerda',
                desloc: 0
            }
        ]
    }


}
class CarrosselView {
    getId(id) {
        return document.getElementById(id)
    }
    getArray(id) {
        return Array.from(document.querySelectorAll(id))
    }

    startAnimate(id) {
        return (id.getBoundingClientRect().top) - parseFloat(window.getComputedStyle(id).height)
    }

    /* getSizeY(id){
        return document.
    } */
    animate(startEffect, container, vel, posY, windowY) {
        if (startEffect <= 0) {
            container.forEach((val, i, arr) => {
                if (i % 2 === 0) {
                    container[i].style.backgroundPositionY = `${posY + (windowY * 2)}px`
                } else {
                    container[i].style.backgroundPositionY = `${posY + (windowY * -1)}px`
                }

            })
        } else {

        }
    }

    getHeight(container, indice) {
        /* Coloca o traslate x num array de objeto para cada container */
        return parseFloat((window.getComputedStyle(container[indice]).backgroundPositionY))
    }
    getWindY() {
        return window.scrollY
    }
}
class CommunsView {
    /* Método para animar o background */
    moveBG(x, tamX, posX0, posAtual, desloc, vel, direc, sent, scroll) {
        /* Movimenta para direita */
        if (desloc < tamX && sent === 'direita') {
            x.style[`backgroundPosition${direc}`] = `${vel + posAtual + scroll}px`
        } else if (desloc > -tamX && sent === 'esquerda') {
            /* Movimenta para esquerda */
            x.style[`backgroundPosition${direc}`] = `${vel + posAtual + scroll}px`
        } else {
            /* Reseta animação */
            x.style[`backgroundPosition${direc}`] = `${posX0}px`;
        }
    }

    /* Função que controla a variável de deslocamento de cada animação */
    deslocCtrl(sent, desloc, size, vel, deltaScroll) {
        if (sent === 'direita') {
            desloc < size ? (desloc += vel + deltaScroll) : desloc = 0
        } else if (sent === 'equerda') {
            desloc > -size ? (desloc -= vel + deltaScroll) : desloc = 0
        }
        return desloc
    }
}
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