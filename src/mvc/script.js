document.addEventListener('DOMContentLoaded', () => {
    /* Inicialização Communs */
    const communsModel = new CommunsModel
    const communsView = new CommunsView
    const communsController = new CommunsController(communsModel, communsView)

    /* Inicializado intersection das animações da section01 */
    const intersectionModel = new IntersectionModel
    const intersectionController = new IntersectionController(intersectionModel, communsController)

    /* Inicialização Fumaça */
    const fumacaModel = new FumacaModel
    new FumacaController(fumacaModel, communsController)

    /* Inicialização fadeIn */
    const fadeInModel = new FadeInModel
    const fadeInView = new FadeInView
    new FadeInController(fadeInModel, fadeInView, communsController)

    /* Inicialização Carossel */
    const carrosselModel = new CarrosselModel
    const carrosselView = new CarrosselView
    new CarrosselController(carrosselModel, carrosselView, communsController, intersectionController)
})