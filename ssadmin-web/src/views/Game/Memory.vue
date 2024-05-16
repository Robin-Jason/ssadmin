<template>
  <div class="memory-game">
    <div class="card-container">
      <div class="card-grid">
        <div v-for="(card, index) in cards" :key="index" class="card" @click="flipCard(card)">
          <div class="card-inner" :class="{ 'is-flipped': card.flipped }">
            <div class="card-front">
              <div class="card-front-content"></div>
            </div>
            <div class="card-back">
              <div class="card-back-content">{{ card.number }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="祝贺" :visible.sync="showCongratulationDialog" width="30%">
      <span>恭喜你!你成功地匹配了所有卡牌。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetGame">再玩一次</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MemoryGame',
  data() {
    return {
      cards: [],
      flippedCards: [],
      showCongratulationDialog: false,
    };
  },
  created() {
    this.initializeCards();
  },
  methods: {
    initializeCards() {
      const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
      const duplicatedNumbers = [...numbers, ...numbers];
      const shuffledNumbers = this.shuffleArray(duplicatedNumbers);

      this.cards = shuffledNumbers.map((number, index) => ({
        id: index + 1,
        number,
        flipped: false,
      }));
    },
    shuffleArray(array) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    },
    flipCard(card) {
      if (this.flippedCards.length === 2 || card.flipped) {
        return;
      }

      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        setTimeout(() => {
          const [card1, card2] = this.flippedCards;
          if (card1.number !== card2.number) {
            card1.flipped = false;
            card2.flipped = false;
          }
          this.flippedCards = [];
          this.checkCompletion();
        }, 1000);
      }
    },
    checkCompletion() {
      if (this.cards.every(card => card.flipped)) {
        this.showCongratulationDialog = true;
      }
    },
    resetGame() {
      this.showCongratulationDialog = false;
      this.initializeCards();
    },
  },
};
</script>

<style scoped>
.memory-game {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-container {
  width: 100%;
  max-width: 800px;
  padding: 30px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 30px;
  justify-items: center;
  align-items: center;
}

.card {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 24px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
}

.card-front,
.card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  border-radius: 24px;
}

.card-front {
  background: #424242;
}

.card-back {
  background: #fff;
  transform: rotateY(180deg);
}

.card-inner.is-flipped {
  transform: rotateY(180deg);
}
</style>