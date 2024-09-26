class GameModel {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 6; // 預設6對卡片
        this.flipCount = 0;
        this.startTime = null;
        this.endTime = null;
        this.gameStarted = false;
    }

    initializeCards() {
        const symbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍇'];
        this.cards = [...symbols, ...symbols]
            .sort(() => Math.random() - 0.5)
            .map((symbol, index) => ({ id: index, symbol, isFlipped: false, isMatched: false }));
    }

    flipCard(index) {
        const card = this.cards[index];
        if (!card.isMatched && this.flippedCards.length < 2) {
            if (!card.isFlipped) {
                card.isFlipped = true;
                this.flippedCards.push(card);
                this.flipCount++;
                if (!this.gameStarted) {
                    this.gameStarted = true;
                    this.startTime = Date.now();
                }
                return true;
            } else if (this.flippedCards.length === 1) {
                card.isFlipped = false;
                this.flippedCards = [];
                this.flipCount++;
                return true;
            }
        }
        return false;
    }

    checkMatch() {
        if (this.flippedCards.length === 2) {
            if (this.flippedCards[0].symbol === this.flippedCards[1].symbol) {
                this.flippedCards.forEach(card => card.isMatched = true);
                this.matchedPairs++;
                this.resetFlippedCards();
                return true;
            }
        }
        return false;
    }

    resetFlippedCards() {
        this.flippedCards.forEach(card => {
            if (!card.isMatched) {
                card.isFlipped = false;
            }
        });
        this.flippedCards = [];
    }

    isGameComplete() {
        if (this.matchedPairs === this.totalPairs) {
            this.endTime = Date.now();
            return true;
        }
        return false;
    }

    getGameStats() {
        const duration = this.endTime - this.startTime;
        return {
            flipCount: this.flipCount,
            duration: Math.floor(duration / 1000)
        };
    }

    resetGame() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.flipCount = 0;
        this.startTime = null;
        this.endTime = null;
        this.gameStarted = false;
        this.initializeCards();
    }
}