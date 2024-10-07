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