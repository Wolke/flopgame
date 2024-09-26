class GameModel {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 6; // 預設6對卡片
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
                return true;
            } else if (this.flippedCards.length === 1) {
                // 只有當只有一張卡片被翻開時,才允許翻回
                card.isFlipped = false;
                this.flippedCards = [];
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
        return this.matchedPairs === this.totalPairs;
    }
}