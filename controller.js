class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.timer = null;
        this.init();
    }

    init() {
        this.model.initializeCards();
        this.view.renderCards(this.model.cards);
        this.addEventListeners();
        this.updateStats();
    }

    addEventListeners() {
        this.view.gameContainer.addEventListener('click', (e) => {
            const cardElement = e.target.closest('.card');
            if (cardElement) {
                const index = parseInt(cardElement.dataset.index);
                this.handleCardClick(index);
            }
        });

        this.view.resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    handleCardClick(index) {
        if (this.model.flipCard(index)) {
            const flippedCard = this.model.cards[index];
            this.view.flipCard(flippedCard);

            if (!this.timer && this.model.gameStarted) {
                this.startTimer();
            }

            this.updateStats();

            if (this.model.flippedCards.length === 2) {
                setTimeout(() => {
                    if (this.model.checkMatch()) {
                        if (this.model.isGameComplete()) {
                            this.endGame();
                        }
                    } else {
                        this.model.flippedCards.forEach(card => this.view.unflipCard(card));
                        this.model.resetFlippedCards();
                    }
                    this.updateStats();
                }, 1000);
            }
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.updateStats();
        }, 1000);
    }

    updateStats() {
        const elapsedTime = this.model.gameStarted ? this.getElapsedTime() : 0;
        this.view.updateStats(this.model.flipCount, elapsedTime);
    }

    getElapsedTime() {
        return Math.floor((Date.now() - this.model.startTime) / 1000);
    }

    endGame() {
        clearInterval(this.timer);
        const stats = this.model.getGameStats();
        this.view.showGameComplete(stats);
    }

    resetGame() {
        clearInterval(this.timer);
        this.timer = null;
        this.model.resetGame();
        this.view.resetView();
        this.view.renderCards(this.model.cards);
        this.updateStats();
    }
}