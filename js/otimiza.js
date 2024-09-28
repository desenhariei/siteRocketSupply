/* Caminhos */
const pathCamisaInicial = '../assets/imagens/sequenciaPNG/camisaInicial'
const pathLogoRocket3d = '../assets/imagens/sequenciaPNG/logoRocket3d'


/* Variáveis LoadWindows */
const loadingWindow = document.getElementById('loadingWindow')
const errorLoadingWindow = document.getElementById('errorLoadingWindow')
const errorLoadingTitle = document.getElementById('errorLoadingTitle')

/*  */
const carrosselPathImgs = '../assets/fotos'
let carrosselContainer = document.getElementsByClassName('carrosselColuna')
let carrosselArrayRecurses = []
let carrosselImgsPerContainerArray = []
let numContainers = 4

async function gettingRecurses(diretorio) {
    /* Pressets Iniciais */
    window.scrollTo(0, 0)

    /* Busca os Recursos, para sucesso coloca num Array, para fracasso habilita a errorLoadingWindow */
    try {
        const response = await (await fetch(diretorio)).text()
        const txtToHtml = new DOMParser
        const document = txtToHtml.parseFromString(response, 'text/html')
        const nodeAllImgs = document.querySelectorAll('ul#files a.icon-image')
        const allImgs = Array.from(nodeAllImgs).map(img => img.href).map(src => src.replace('.preview', ''))
        return allImgs
    }
    catch (error) {
        errorLoadingTitle.innerText = `Erro ao carregar os recursos da Página. Erro: ${error}`
        errorLoadingWindow.style.cssText = 'display:block; opacity:1'
    }
}

  /* Carrossel preLoad de Recursos, coloca os endereçoes dentro das variáveis */
  try {
    async function carrosselGetRecurses() {
        /* Coloca cada url das pasdas dentro de um array */
        const carrosselFiles = await (await fetch(carrosselPathImgs)).text()
        const txtToHtml = new DOMParser
        let carrosselHtmlImgs = txtToHtml.parseFromString(carrosselFiles, 'text/html')
        let carrosselNodeImgs = carrosselHtmlImgs.querySelectorAll('ul#files.view-tiles li > a.icon')
        let carroselArrayImgsUpFolder = Array.from(carrosselNodeImgs)

        /* Seleciona as pastas onde há as imagens */
        carroselArrayImgsUpFolder.forEach((valor, indice) => {
            carroselArrayImgsUpFolder[indice] = valor.href.slice(0, -1)
        });

        /* Seleciona todos os arquivos de todas as pastas */
        for (const value of carroselArrayImgsUpFolder) {
            let response = await (await fetch(value)).text()
            let carrosselAllImgsHtml = txtToHtml.parseFromString(response, 'text/html')
            let carrosselAllImgsNodes = carrosselAllImgsHtml.querySelectorAll('ul#files.view-tiles li > a:not([href$="/"])')
            carrosselArrayRecurses = Array.from(carrosselAllImgsNodes).map(folder => folder.href).map(value => value.replace('.preview', ''))
        }
    }
    carrosselGetRecurses()
} catch {
    console.log('Erro ao carregar Imagens')
}


/* Variáveis Recursos Carregado */
let arrayRecursesCamisaInicial = []
let arrayRecursesLogoRocket3d = []


async function loadRecurses() {
    /* Tempo de Load da Página */

    try {
        /*Atribuição de valores as Variáveis Recursos Carregados */
        const loadStart = performance.now()
        arrayRecursesCamisaInicial = await gettingRecurses(pathCamisaInicial)
        arrayRecursesLogoRocket3d = await gettingRecurses(pathLogoRocket3d)
        
        /* Carrossel */
         /* Separa o Array com todas as imagens nos grupos que serão colocados em cada container html */
         gettingRecurses()
         let carrosselImgPerContainer = Math.ceil(carrosselArrayRecurses.length / numContainers)
         for (i = 0; i < numContainers; i++) {
             if (i < numContainers - 1) {
                 carrosselImgsPerContainerArray[i] = carrosselArrayRecurses.slice((i * carrosselImgPerContainer), ((i + 1) * carrosselImgPerContainer))
             } else {
                 carrosselImgsPerContainerArray[i] = carrosselArrayRecurses.slice((i * carrosselImgPerContainer))
             }
         }

         /* Cria uma img com o endereço de url correto e coloca dentro do elementos html */
         carrosselImgsPerContainerArray.forEach((val, i) => {
             let containerImgs = carrosselContainer[i]
             carrosselImgsPerContainerArray[i].forEach((val1, i1) => {
                 let carrosselImg = document.createElement('img')
                 carrosselImg.src = val1
                 carrosselImg.classList.add('carrosselImg')
                 containerImgs.appendChild(carrosselImg)
             })
         })

        const loadEnd = performance.now()
        const loadTime = loadEnd - loadStart

        /* Define tempo de Load min de 3s */
        if (loadTime < 3000) {
            setTimeout(() => {
                usaRecurses()
            }, 3000 - loadTime)

        } else {
            usaRecurses()
        }


    } catch {
        errorLoadingWindow.style.cssText = 'display: block; opacity:1;'
    }
}
loadRecurses()

/* Todas as funções que utilizam recursos carregados previamente */
function usaRecurses() {
    /* Ocuta tela de Bem-Vindo */
    loadingWindow.style.opacity = '0'
    new Promise(resolve => {
        setTimeout(() => {
            loadingWindow.style.display = 'none'
            document.body.style.overflowY = 'auto'
            resolve()
        }, 1000);
    })

    /* Variáveis slogan */
    const sloganHome = document.getElementById('sloganHome')

    /* Variáveis da Animação da Camisa Inicial */
    const camisaInicialImg = document.getElementById('camisaInicial')
    const frameRateCamisaInicial = 10
    let lastUpdateCamisaInicial = 0
    let currentFrameCamisaInicial = 0

    /* Variáveis da Sombra da Camisa Inicial */
    const sombraCamisaInicial = document.getElementById('sombraCamisaInicial')

    /* Variáveis do Bounce */
    const bounceHeight = 30
    const bounceAnimationDuration = 15 * (1000)
    let bounceInitialPositionCamisaInicial
    let bounceInitialPositionSombraCamisa
    let lastUpdateBounce = 0

    /* Variáveis da Animação da Logo da Rocket */
    const logoRocket3dImg = document.getElementById('logoRocket3d')
    const frameRateLogoRocket3d = 100
    let lastUpdateLogoRocket3d = 0
    let currentFrameLogoRocket3d = 0

    /* Animação de Descida da Camisa Inicial e da Sombra (css=>top:-600px;transition:3s;) */
    camisaInicialImg.style.top = '200px'
    sombraCamisaInicial.style.top = '270px'

    /* Animação Opacidade do Slogan e da Logo */
    function show(element, tmp) {
        new Promise(resolve => {
            setTimeout(() => {
                element.style.opacity = '1'
                resolve()
            }, tmp * 1000);
        })
    }
    show(sloganHome, 2.2)
    show(logoRocket3dImg, 3.5)

    /* Variável que ajuda a garantir que a imagem está na posição certa antes de começar a animação de Bounce */
    let bounceStart = false


    function homeAnimation(timestamp) {
        /* Animações que usam RequestAnimateFrame */

        /* Animação de Rotação da Camisa Inicial */
        if (!lastUpdateCamisaInicial) {
            lastUpdateCamisaInicial = timestamp
        }

        if (timestamp - lastUpdateCamisaInicial >= frameRateCamisaInicial) {
            if (currentFrameCamisaInicial < arrayRecursesCamisaInicial.length) {
                camisaInicialImg.src = arrayRecursesCamisaInicial[currentFrameCamisaInicial]
                currentFrameCamisaInicial++
                lastUpdateCamisaInicial = timestamp
            } else {
                /* Inicia a animação de bounce caso a de traslação já tenha acabado */

                /* Garanti que a imagem está na posição certa antes de começar a animação de Bounce */
                if (camisaInicialImg.offsetTop === 200 && sombraCamisaInicial.offsetTop === 270) {
                    bounceStart = true
                }

                /* Valida a posição da Camisa */
                if (bounceStart) {
                    bounceAnimate()
                }
            }
        }

        function bounceAnimate() {
            /* Animação de Bounce */

            if (!lastUpdateBounce) {
                lastUpdateBounce = timestamp
            }
            let bounceAnimationProgress = (timestamp - lastUpdateBounce) / bounceAnimationDuration

            if (bounceAnimationProgress < 1) {
                if (!bounceInitialPositionCamisaInicial && !bounceInitialPositionSombraCamisa) {

                    /* Define a posição inicial do Bounce */
                    bounceInitialPositionCamisaInicial = camisaInicialImg.offsetTop
                    bounceInitialPositionSombraCamisa = sombraCamisaInicial.offsetTop
                }
                /* Executa o Bounce */
                let bounceDeslocamento = -(Math.sin(bounceAnimationProgress * Math.PI * 2) * bounceHeight)
                /* Camisa */
                camisaInicialImg.style.transition = `0s ease-in-out`
                camisaInicialImg.style.top = `${bounceDeslocamento + bounceInitialPositionCamisaInicial}px`
                /* Sombra */
                sombraCamisaInicial.style.transition = `0s ease-in-out`
                sombraCamisaInicial.style.top = `${bounceDeslocamento + bounceInitialPositionSombraCamisa}px`

            } else {
                /* Mantem o Loop */
                bounceAnimationProgress = 0
                lastUpdateBounce = timestamp
            }
        }

        /* Animação da Logo da Rocket Supply */
        if (!lastUpdateLogoRocket3d) {
            lastUpdateLogoRocket3d = timestamp
        }

        /* Controla o tempo da Animação */
        if (timestamp - lastUpdateLogoRocket3d >= frameRateLogoRocket3d) {
            /* Intera as imgs */
            if (currentFrameLogoRocket3d < arrayRecursesLogoRocket3d.length) {
                logoRocket3dImg.src = arrayRecursesLogoRocket3d[currentFrameLogoRocket3d]
                currentFrameLogoRocket3d++
                lastUpdateLogoRocket3d = timestamp
            } else {
                /* Mantem o Loop */
                currentFrameLogoRocket3d = 0
                lastUpdateLogoRocket3d = timestamp
            }

        }
        requestAnimationFrame(homeAnimation)
    }
    requestAnimationFrame(homeAnimation)
}

/* Load de Fonts */
try {
    const linkFont = document.createElement('link')
    linkFont.href = 'https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap'
    linkFont.rel = 'stylesheet'
    document.head.appendChild(linkFont)
} catch {
    window.alert('Erro ao carregar as Fonts')
}

/* Nav Bar Configuações */
/* Variáveis MenuBar */
const menuBarButtom = document.getElementById('menuBarButtom')
const menuBarContent = document.getElementById('menuBarContentContainer')

/* Funções MenuBar */
/* OnClick */
menuBarButtom.addEventListener('click', () => {
    console.log('clicou')
    menuBarButtom.classList.add('menuBarButtomHouver')
    menuBarContent.style.opacity = '1'
    menuBarContent.style.top = '75px'
})

/* OffClick */
document.addEventListener('click', (event) => {
    if (!menuBarButtom.contains(event.target) && !menuBarContent.contains(event.target)) {
        menuBarButtom.classList.remove('menuBarButtomHouver')
        menuBarContent.style.opacity = '0'
        menuBarContent.style.top = '-160px'
    }

})

/* Efeito Parallax do AboutUs */
const targetElement = document.getElementById('homeSection02')

window.addEventListener('scroll', () => {
    let scrollWindow = window.scrollY
    let targetPosition = targetElement.offsetHeight
    /* Os valores do Padding e top interferem na altura real e altura de visualização do elemento */
    const targetTop = parseInt(window.getComputedStyle(targetElement).top)
    const targetPaddingTop = parseInt(window.getComputedStyle(targetElement).paddingTop)


    if (scrollWindow <= targetPosition - (targetTop + targetPaddingTop)) {
        targetElement.style.transform = `translateY(${scrollWindow * -1}px)`
    } else {
        /* Remove o Efeito Parallax */
        /* Preciso manter a Posição que foi modificada no efeito parallax */
        let targetElementStyle = window.getComputedStyle(targetElement)
        let targetElementTrasformText = targetElementStyle.transform

        /* Garantir que so seja executada caso houver variação do traslateY */
        if (targetElementTrasformText !== 'none') {
            let targetElementTrasformY = targetElementTrasformText.split('(')[1].split(')')[0].split(',')
            targetElement.style.transform = `translateY(${targetElementTrasformY[5]}px)`
        }
    }
})

