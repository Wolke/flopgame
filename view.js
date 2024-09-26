class GameView {
    constructor() {
        this.gameContainer = document.getElementById('game-container');
    }

    renderCards(cards) {
        this.gameContainer.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.isFlipped ? 'flipped' : ''}`;
            cardElement.dataset.index = index;

            const frontElement = document.createElement('div');
            frontElement.className = 'front';
            frontElement.textContent = '?';

            const backElement = document.createElement('div');
            backElement.className = 'back';
            backElement.textContent = card.symbol;

            cardElement.appendChild(frontElement);
            cardElement.appendChild(backElement);

            this.gameContainer.appendChild(cardElement);
        });
    }

    flipCard(card) {
        const cardElement = this.gameContainer.querySelector(`[data-index="${card.id}"]`);
        if (cardElement) {
            cardElement.classList.add('flipped');
        }
    }

    unflipCard(card) {
        const cardElement = this.gameContainer.querySelector(`[data-index="${card.id}"]`);
        if (cardElement) {
            cardElement.classList.remove('flipped');
        }
    }

    showGameComplete() {
        const message = document.createElement('div');
        message.className = 'game-complete';
        message.textContent = '恭喜你完成遊戲！';
        this.gameContainer.appendChild(message);
    }
}