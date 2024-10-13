class CarrosselModel {
    constructor() {
        /* Imgs */
        this.imgSrc =  [
            '../src/assets/imagens/carrossel01.webp',
            '../src/assets/imagens/carrossel02.webp',
            '../src/assets/imagens/carrossel03.webp',
            '../src/assets/imagens/carrossel04.webp'
        ]
        
        this.divs = [
            {
                vel: 1,
                direc: 'Y',
                sent: 'direita',
                desloc: 0
            },
            {
                vel: -1,
                direc: 'Y',
                sent: 'esquerda',
                desloc: 0
            },
            {
                vel: 1,
                direc: 'Y',
                sent: 'direita',
                desloc: 0
            },
            {
                vel: -1,
                direc: 'Y',
                sent: 'esquerda',
                desloc: 0
            }
        ]

        this.container = 'section03'
        this.childs = '#section03>div'
    }
}