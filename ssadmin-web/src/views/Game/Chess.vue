<template>
  <div class="chess-game">
    <h1>象棋残局对弈</h1>
    <div class="chess-board">
      <div
          v-for="(cell, index) in board"
          :key="index"
          :class="['cell', getClass(index), cell.piece ? 'occupied' : '']"
          @click="movePiece(index)"
      >
        <span v-if="cell.piece">{{ cell.piece.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChineseChessGame',
  data() {
    return {
      board: [],
      selectedCell: null,
    };
  },
  methods: {
    initializeBoard() {
      this.board = Array(90).fill(null).map(() => ({ piece: null }));
      // 示例棋子布置
      this.board[0] = { piece: { name: '車', color: 'red' } };
      this.board[1] = { piece: { name: '馬', color: 'red' } };
      this.board[3] = { piece: { name: '相', color: 'red' } };
      this.board[4] = { piece: { name: '仕', color: 'red' } };
      this.board[5] = { piece: { name: '帥', color: 'red' } };
      // 车和马的对面位置
      this.board[89] = { piece: { name: '車', color: 'black' } };
      this.board[88] = { piece: { name: '馬', color: 'black' } };
    },
    movePiece(index) {
      if (this.selectedCell === null && this.board[index].piece) {
        this.selectedCell = index;
      } else if (this.selectedCell !== null) {
        const piece = this.board[this.selectedCell].piece;
        this.board[index].piece = piece;
        this.board[this.selectedCell].piece = null;
        this.selectedCell = null;
      }
    },
    getClass(index) {
      const x = index % 9;
      const y = Math.floor(index / 9);
      return (x + y) % 2 === 0 ? 'black' : 'white';
    }
  },
  mounted() {
    this.initializeBoard();
  }
};
</script>

<style scoped>
.chess-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.chess-board {
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(10, 50px);
  width: 450px;
  height: 500px;
}

.cell {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #444;
}

.cell.black {
  background-color: #b58863;
}

.cell.white {
  background-color: #f0d9b5;
}

.cell.occupied {
  font-size: 20px;
  font-weight: bold;
}
</style>