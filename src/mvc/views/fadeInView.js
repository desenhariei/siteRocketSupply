class FadeInView {
    fadeIn(element, condition,direc,initialValueT,finalValueT,initialValueO,finalValueO){
        /* Anima */
            if (condition) {
                element.style.transition = 'all 1s ease-in-out' 
                element.style.transform = `translate${direc}(${finalValueT}px)`
                element.style.opacity = finalValueO
            } else {
                element.style.transition = 'all 1s ease-in-out'                   
                element.style.transform = `translate${direc}(${initialValueT}px)`
                element.style.opacity = initialValueO
            }
    }
}