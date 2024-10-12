class FumacaModel {
    constructor() {
        /* Elementos manipulados e suas propriedades */
        this.fumaca = [
            {
                id: 'fumacaBase01Home',
                vel: 3,
                direc: 'X',
                sent: 'direita',
                desloc: 0
            },
            {
                id: 'fumacaBase02Home',
                vel: 2,
                direc: 'X',
                sent: 'direita',
                desloc: 0
            },
            {
                id: 'fumacaBase03Home',
                vel: -1,
                direc: 'X',
                sent: 'esquerda',
                desloc: 0
            }
        ]

        this.container = '#transicaoFumaca section:nth-of-type(2) div'
    }


}