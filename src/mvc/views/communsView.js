class CommunsView {
    /* Get elements */
    getId(id) {
        return document.getElementById(id)
    }

    getArray(id) {
        return Array.from(document.querySelectorAll(id))
    }

    /* Get properties */
    getArrPosition(id, indice, direc) {
        return parseInt(window.getComputedStyle(id[indice])[`backgroundPosition${direc}`])
    }

    getSize(id, direc) {
        if (direc === 'X') {
            return parseFloat(window.getComputedStyle(id).width)
        }

        else if (direc === 'Y') {
            return parseFloat(window.getComputedStyle(id).height)
        }
    }

    getHight(id) {
        return id.getBoundingClientRect().top
    }

    getWindowHeight() {
        return window.innerHeight
    }

    /* Método para animar o background */
    moveBG(x, tamX, posX0, posAtual, desloc, vel, direc, sent, scroll) {
        /* Movimenta para direita */
        if (desloc < tamX && sent === 'direita') {
            x.style[`backgroundPosition${direc}`] = `${vel + posAtual + (scroll * 2)}px`
        } else if (desloc > -tamX && sent === 'esquerda') {
            /* Movimenta para esquerda */
            x.style[`backgroundPosition${direc}`] = `${vel + posAtual - scroll}px`
        } else {
            /* Reseta animação */
            x.style[`backgroundPosition${direc}`] = `${posX0}px`;
        }
    }

    /* Função que controla a variável de deslocamento de cada animação */
    deslocCtrl(sent, desloc, size, vel, deltaScroll) {
        if (sent === 'direita') {
            desloc < size ? (desloc += vel + deltaScroll) : desloc = 0
        } else if (sent === 'esquerda') {           
            desloc > -size ? (desloc -= vel + deltaScroll) : desloc = 0
        }
        return desloc
    }
}
