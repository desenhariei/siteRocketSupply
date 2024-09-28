/* Animação da fumaça */
class FumacaBaseHomeAnimation {
    constructor() {
        /* Caminhos */
        this.fumaca1 = document.getElementById('fumacaBase01Home')
        this.fumaca2 = document.getElementById('fumacaBase02Home')
        this.fumaca3 = document.getElementById('fumacaBase03Home')

        /* Posições do bg Iniciais */
        this.fumaca1PosX0 = parseInt(window.getComputedStyle(this.fumaca1).backgroundPositionX)
        this.fumaca2PosX0 = parseInt(window.getComputedStyle(this.fumaca2).backgroundPositionX)
        this.fumaca3PosX0 = parseInt(window.getComputedStyle(this.fumaca3).backgroundPositionX)

        /* Variáveis locais de controle interno */
        this.windowUltimoAlt = 0
        this.windowAltVariat = 0
        /* Deslocamento X de cada bg de cada fumaça */
        this.fumaca1Desloc = 0
        this.fumaca2Desloc = 0
        this.fumaca3Desloc = 0

        /* Velocidade e sentido da animação */
        this.fumaca1Vel = 2.5
        this.fumaca1Sent = 'direita'
        this.fumaca2Vel = 1.25
        this.fumaca2Sent = 'direita'
        this.fumaca3Vel = -0.5
        this.fumaca3Sent = 'esquerda'

        /* Coleta a variação do scrollY */
        window.addEventListener('scroll', () => {
            this.windowAltAgora = window.scrollY
            this.windowAltVariat = this.windowAgoraAlt - this.windowUltimoAlt
            this.windowUltimoAlt = this.windowAgoraAlt

            clearInterval(this.isScrolling)
            this.isScrolling = setInterval(() => {
                this.windowAltVariat = 0
            }, 100)
        })

        this.fumacaAnimate()
    }

    /* Método para animar o background */
    moveBG(x, tamX, posX0, posAtual, desloc, vel, sent) {
        /* Movimenta para direita */
        if (desloc < tamX && sent === 'direita') {
            x.style.backgroundPositionX = `${vel + posAtual + this.windowAltVariat}px`
        } else if (desloc > -tamX && sent === 'esquerda') {
            /* Movimenta para esquerda */
            x.style.backgroundPositionX = `${vel + posAtual + this.windowAltVariat}px`
        } else {
            /* Reseta animação */
            x.style.backgroundPositionX = `${posX0}px`;
        }


    }

    /* Executa funções em Loop */
    fumacaAnimate() {
        /* Tamanhos X dos BGs */
        this.fumaca1SizeX = parseFloat((window.getComputedStyle(this.fumaca1).backgroundSize).split(' ')[0])
        this.fumaca2SizeX = parseFloat((window.getComputedStyle(this.fumaca2).backgroundSize).split(' ')[0])
        this.fumaca3SizeX = parseFloat((window.getComputedStyle(this.fumaca3).backgroundSize).split(' ')[0])

        /* Posição X dos BGs */
        this.fumaca1PosX = parseFloat(window.getComputedStyle(this.fumaca1).backgroundPositionX)
        this.fumaca2PosX = parseFloat(window.getComputedStyle(this.fumaca2).backgroundPositionX)
        this.fumaca3PosX = parseFloat(window.getComputedStyle(this.fumaca3).backgroundPositionX)

        /* Controla a variavel de deslocamento de cada animação */
        /* Fumaça 1 */
        this.fumaca1Desloc < this.fumaca1SizeX
            ? (this.fumaca1Desloc += 1)
            : this.fumaca1Desloc = 0
        /* Fumaça 2 */
        this.fumaca2Desloc < this.fumaca2SizeX
            ? (this.fumaca2Desloc += 1)
            : this.fumaca2Desloc = 0
        /* Fumaça 3 */
        this.fumaca3Desloc > -this.fumaca3SizeX
            ? (this.fumaca3Desloc -= 1)
            : this.fumaca3Desloc


        /* Executa o loop de animação para cada elemento */
        /* Fumaça 1 */
        this.moveBG(
            this.fumaca1,
            this.fumaca1SizeX,
            this.fumaca1PosX0,
            this.fumaca1PosX,
            this.fumaca1Desloc,
            this.fumaca1Vel,
            this.fumaca1Sent
        )
        /* Fumaça 2 */
        this.moveBG(
            this.fumaca2,
            this.fumaca2SizeX,
            this.fumaca2PosX0,
            this.fumaca2PosX,
            this.fumaca2Desloc,
            this.fumaca2Vel,
            this.fumaca2Sent
        )
        /* Fumaça 3 */
        this.moveBG(
            this.fumaca3,
            this.fumaca3SizeX,
            this.fumaca3PosX0,
            this.fumaca3PosX,
            this.fumaca3Desloc,
            this.fumaca3Vel,
            this.fumaca3Sent
        )

        requestAnimationFrame(this.fumacaAnimate.bind(this))
    }
}
(new FumacaBaseHomeAnimation())

/* Animação do carrossel */
class CarrosselHomeGetImgs {
    constructor() {
        /* Container onde vão ficar as imgs */
        this.containerImg = document.querySelectorAll('#section03 div')

        /* Variáveis para pegar os links da pastas onde estão recursos */
        this.linkslAll = []
        this.pathAll = '../assets/fotos/'
        this.queryAll = 'ul#files.view-tiles li a.icon-directory:not([title=".."])'

        /* Variáveis para pegar os links dos recursos */
        this.links = []
        this.path = []
        this.query = 'ul#files.view-tiles li a.icon-image:not([title=".."])'

        /* Inicia */
        this.init()
    }

    /* Executa as funções na ordem certa */
    async init() {
        await this.getImgLinks()
        this.getValueImg()
    }

    /* Pega todos os links de recursos */
    async getImgLinks() {
        /* Função carrega recursos a partir de um caminho e um querySelector */
        const getFolder = async (path, query) => {
            this.arqu = await (await fetch(path)).text()
            this.textToHtml = new DOMParser
            this.arquHtml = this.textToHtml.parseFromString(this.arqu, 'text/html')
            this.folderLinks = Array.from(this.arquHtml.querySelectorAll(query))
            return this.folderLinks.map(el => el.href)
        }
        /* Pega os caminhos das pastas com imgs */
        this.linkslAll = await getFolder(this.pathAll, this.queryAll)

        /* Pega o caminho de todas as imgs */
        for (const val of this.linkslAll) {
            const imgLinks = await getFolder(val, this.query)
            this.links.push(...imgLinks)
            this.links = this.links.map(el => el.replace('.preview', ''))
        }
    }

    /* Cria img, passar o src e coloca no container certo */
    createImg(path, i) {
        let img = document.createElement('img')
        img.src = path
        this.containerImg[i].appendChild(img)
    }

    /* Coloca a quantidade certa de img em cada container */
    getValueImg() {
        let linksPerCont = []
        const imgPerCont = Math.floor(this.links.length / this.containerImg.length)

        for (let i = 0; i < this.containerImg.length; i++) {
            /* Separa as img de cada container em um array */
            linksPerCont[i] = this.links.slice(imgPerCont * i,
                i < this.containerImg.length ? imgPerCont * (i + 1) : this.links.length)

            linksPerCont[i].forEach((path) => {
                this.createImg(path, i)
            })
        }
    }


}
(new CarrosselHomeGetImgs())

class CarrosselParallax {
    constructor() {
        this.section03 = document.getElementById('section03')
        this.containers = Array.from(document.querySelectorAll('#section03>div'))
         /* - parseFloat(window.getComputedStyle(this.section03).height) */
        this.containersAtt = []
        this.init()

    }
    init() {
        this.setContAtt()
        this.changeAtt()
    }

    setContAtt() {
        /* Coloca o traslate x num array de objeto para cada container */
        this.containers.forEach((val, i, arr) => {
            this.containersAtt[i] = {
                pos: parseFloat((window.getComputedStyle(this.containers[i]).transform).split(',')[5])

            }

        })

    }
    changeAtt() {
        console.log(this.containersAtt[1].pos)
        window.addEventListener('scroll', () => {
            this.startEffect = (this.section03.getBoundingClientRect().top) - parseFloat(window.getComputedStyle(this.section03).height)
            let windowHeight = window.scrollY 

           
            if (this.startEffect <= 0) {
                this.containersAtt.forEach((val, i, arr) => {
                    console.log(val.pos)
                    if (i % 2 === 0) {
                        this.containers[i].style.transform = `translate(0, ${val.pos + (windowHeight * 2)}px)`
                    } else {
                        this.containers[i].style.transform = `translate(0, ${val.pos + (windowHeight * -1)}px)`
                    }

                })
            } else {

            }
        })
    }
}
(new CarrosselParallax())