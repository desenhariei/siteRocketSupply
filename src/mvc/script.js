document.addEventListener('DOMContentLoaded', () => {
    /* Inicialização Communs */
    const communsModel = new CommunsModel
    const communsView = new CommunsView
    const communsController = new CommunsController(communsModel, communsView)

    /* Inicialização Fumaça */
    const fumacaModel = new FumacaModel
    const fumacaView = new FumacaView
    new FumacaController(fumacaModel, fumacaView, communsController)

    /* Inicialização Carossel */
    const carrosselModel = new CarrosselModel
    const carrosselView = new CarrosselView
    new CarrosselController(carrosselModel, carrosselView, communsController)
})