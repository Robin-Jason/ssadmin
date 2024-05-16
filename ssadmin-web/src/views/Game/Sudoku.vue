<template>
  <div class="sudoku">
    <el-card>
      <div class="sudoku-grid">
        <div
            v-for="(cell, index) in cells"
            :key="index"
            class="sudoku-cell"
            :class="{ fixed: cell.fixed }"
        >
          <input
              type="number"
              min="1"
              max="9"
              v-model.number="cell.value"
              :disabled="cell.fixed"
          />
        </div>
      </div>
      <div class="button-group">
        <el-button type="primary" @click="checkSolution">检查答案</el-button>
        <el-button type="success" @click="generateSudoku">重新生成</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cells: Array.from({ length: 81 }, () => ({ value: 0, fixed: false })),
    };
  },
  methods: {
    checkSolution() {
      const validGroup = (group) => {
        const seen = new Set();
        for (let i = 0; i < 9; i++) {
          const num = group[i].value;
          if (num < 1 || num > 9 || seen.has(num)) return false;
          seen.add(num);
        }
        return true;
      };

      for (let i = 0; i < 9; i++) {
        const row = this.cells.slice(i * 9, i * 9 + 9);
        if (!validGroup(row)) {
          alert(`行 ${i + 1} 不符合规则`);
          return;
        }

        const col = this.cells.filter((_, index) => index % 9 === i);
        if (!validGroup(col)) {
          alert(`列 ${i + 1} 不符合规则`);
          return;
        }
      }

      for (let block = 0; block < 9; block++) {
        const blockValues = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const idx = ((block % 3) * 3) + (Math.floor(block / 3) * 27) + (row * 9) + col;
            blockValues.push(this.cells[idx]);
          }
        }
        if (!validGroup(blockValues)) {
          alert(`3x3的方块 ${block + 1} 不符合规则`);
          return;
        }
      }

      alert('恭喜！你的答案是正确的！');
    },
    generateSudoku() {
      this.cells.forEach((cell, index) => {
        if (Math.random() > 0.7) {
          cell.value = Math.ceil(Math.random() * 9);
          cell.fixed = true;
        } else {
          cell.value = 0;
          cell.fixed = false;
        }
      });
    },
  },
  mounted() {
    this.generateSudoku();
  },
};
</script>

<style scoped>
.sudoku {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 100px); /* 减去顶部导航栏或其他高度 */
}

.sudoku-grid {
  display: grid;
  grid-template-columns: repeat(9, 60px); /* 增大单元格尺寸 */
  grid-template-rows: repeat(9, 60px);
  gap: 5px; /* 增大间隙 */
}

.sudoku-cell input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 24px; /* 增大字体大小 */
  background-color: #f0f0f0; /* 设置更明亮的背景色 */
  border-radius: 5px; /* 圆角设计 */
}

.sudoku-cell.fixed input {
  background-color: #dcdcdc; /* 固定数字背景色更深 */
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px; /*增大按钮间距 */
  margin-top: 20px; /* 增加上边距 */
}

.el-button {
  font-size: 16px; /* 增大按钮字体大小 */
  padding: 10px 20px; /* 增大按钮内边距 */
}
</style>