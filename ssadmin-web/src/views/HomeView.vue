<template>
  <div class="home">
    <div class="top-bar">
      <div class="user-info">
        <el-avatar src="@/assets/user-avatar.png" size="large"></el-avatar>
        <div class="user-details">
          <p>早晨好, 李先生!</p>
          <p>2024年5月15日 星期二</p>
        </div>
        <div class="time-weather">
          <p>10:05</p>
          <el-button type="text" icon="el-icon-sunny">晴 - 23°C</el-button>
        </div>
      </div>
    </div>
    <div class="content-area">
      <div class="main-content">
        <div class="interaction-buttons">
          <el-button icon="el-icon-edit" @click="goToGameSelection" class="action-button">健脑游戏</el-button>
          <el-button icon="el-icon-document" class="action-button">健康报告</el-button>
          <el-button icon="el-icon-chat-dot-round" class="action-button">与蓝心聊天</el-button>
        </div>
        <div class="health-challenge">
          <h2>你一定不知道的生活健康知识</h2>
          <div class="challenge-image" style="background-color: #ccc; height: 200px;">图片位置</div>
        </div>
        <div class="goal-section">
          <div class="goal-header">
            <h3>今日目标</h3>
          </div>
          <div class="goal-content">
            <p>早上起床做50分健身操, 下午3点50分做口语练习</p>
          </div>
        </div>
        <div class="daily-suggestions">
          <h4>每日建议</h4>
          <ul>
            <li>早上起床做50分健身操</li>
            <li>下午3点50分做口语练习</li>
            <li>下午6点: 0糖食品采购</li>
            <li>晚上8点30分学习视频</li>
          </ul>
        </div>
      </div>
      <div class="side-panel">
        <div class="health-stats">
          <h4>健康统计</h4>
          <div class="stat-item">
            <p>今日步数</p>
            <h3>138/80</h3>
          </div>
          <div class="stat-item">
            <p>心率</p>
            <h3>93</h3>
          </div>
          <div class="stat-item">
            <p>睡眠</p>
            <h3>85</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goToGameSelection() {
      this.$router.push('/game-selection');
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  font-family: "PingFang SC", sans-serif;
  background-color: #F7F8FA;
  font-size: 18px; /* 增加字体大小便于阅读 */
}

.top-bar, .content-area {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-details p, .time-weather p {
  margin: 0;
  color: #333;
  font-size: 20px; /* 增大字体 */
}

.time-weather {
  margin-left: auto; /* 自动调整左边距，使天气图标向右移动 */
  padding-left: 50px; /* 增加左侧内边距 */
}

.content-area {
  display: flex;
  flex-direction: row;
}

.main-content {
  flex: 3;
  background-color: #FFF;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.side-panel {
  flex: 1;
  flex-direction: column;
  background-color: #FFF;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.interaction-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.interaction-buttons .action-button {
  flex-grow: 1;
  margin: 0 5px;
  color: #FFFFFF;
  background-color: #409EFF;
  border: none;
  font-size: 18px; /* 增大按钮字体 */
}

.health-challenge, .goal-section, .daily-suggestions {
  margin-top: 20px;
}

.health-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.health-stats .stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.health-stats h3, .health-stats p {
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 24px; /* 增大统计数据字体 */
}

.stat-item h3 {
  color: #409EFF;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
  font-size: 18px; /* 增大列表项字体 */
}
</style>