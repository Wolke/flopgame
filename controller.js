class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.model.initializeCards();
        this.view.renderCards(this.model.cards);
        this.addEventListeners();
    }

    addEventListeners() {
        this.view.gameContainer.addEventListener('click', (e) => {
            const cardElement = e.target.closest('.card');
            if (cardElement) {
                const index = parseInt(cardElement.dataset.index);
                this.handleCardClick(index);
            }
        });
    }

    handleCardClick(index) {
        if (this.model.flipCard(index)) {
            const flippedCard = this.model.cards[index];
            this.view.flipCard(flippedCard);

            if (this.model.flippedCards.length === 2) {
                setTimeout(() => {
                    if (this.model.checkMatch()) {
                        if (this.model.isGameComplete()) {
                            this.view.showGameComplete();
                        }
                    } else {
                        this.model.flippedCards.forEach(card => this.view.unflipCard(card));
                        this.model.resetFlippedCards();
                    }
                }, 1000);
            }
        }
    }
}