class GameView {
    constructor() {
        this.gameContainer = document.getElementById('game-container');
        this.statsContainer = document.createElement('div');
        this.statsContainer.id = 'stats-container';
        document.body.insertBefore(this.statsContainer, this.gameContainer);
        this.resetButton = document.createElement('button');
        this.resetButton.textContent = '重新開始';
        this.resetButton.id = 'reset-button';
        document.body.insertBefore(this.resetButton, this.gameContainer);
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

    updateStats(flipCount, duration) {
        this.statsContainer.innerHTML = `翻牌次數: ${flipCount} | 時間: ${duration}秒`;
    }

    showGameComplete(stats) {
        const message = document.createElement('div');
        message.className = 'game-complete';
        message.innerHTML = `
            <h2>恭喜你完成遊戲！</h2>
            <p>翻牌次數: ${stats.flipCount}</p>
            <p>用時: ${stats.duration}秒</p>
        `;
        this.gameContainer.appendChild(message);
    }

    resetView() {
        this.gameContainer.innerHTML = '';
        this.statsContainer.innerHTML = '';
    }
}