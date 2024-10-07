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