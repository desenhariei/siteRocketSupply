class FadeInModel {
    constructor() {
        /* Textos */
        this.texts = '.content02 section article, #section04 section section:nth-child(n)'
        this.textsProp =
        {
            valueIT: -300,
            valueFT: 0,
            valueIO: 0,
            valueFO: 1,
            direc: 'X'
        }
        /* Imagens */
        this.imgs = '#section02 .content02 figure img, #section04 section img:nth-of-type(-10n+1)'
        this.imgsProp =
        {
            valueIT: 0,
            valueFT: 0,
            valueIO: 0.2,
            valueFO: 1,
            direc: 'Y'
        }
    }
}