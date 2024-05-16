<template>
  <div class="chat-page">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>与蓝心聊天</span>
          </div>
          <div class="messages">
            <el-scrollbar wrap-class="scrollbar-wrapper">
              <el-card v-for="(msg, index) in messages" :key="index" class="message-card" :class="{'user-message': msg.source === 'user', 'ai-message': msg.source === 'ai'}">
                <p>{{ msg.content }}</p>
              </el-card>
            </el-scrollbar>
          </div>
          <div class="text item input-area">
            <el-input
                v-model="message"
                placeholder="输入消息..."
                @keyup.enter.native="sendMessage"
                class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-send" @click="sendMessage">发送</el-button>
              <el-button slot="append" icon="el-icon-microphone" @click="startSpeechToText">语音</el-button>
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messages: []
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.messages.push({ source: 'user', content: this.message });
        this.message = ''; // Clear input after send
        this.sendToAI();
      }
    },
    sendToAI() {
      // 模拟AI回复
      setTimeout(() => {
        const aiMessage = "这是蓝心的回复: " + this.messages[this.messages.length - 1].content;
        this.messages.push({ source: 'ai', content: aiMessage });
      }, 1000);
    },
    startSpeechToText() {
      // 这里可以添加实际的语音识别逻辑
      alert('语音输入功能尚未实现');
    }
  }
};
</script>

<style scoped>
.chat-page {
  margin: 20px;
}

.box-card {
  width: 100%;
  height: 600px;
}

.input-area {
  padding-top: 10px;
}

.input-with-select {
  width: 100%;
}

.messages {
  height: 450px;
  overflow-y: auto;
}

.message-card {
  margin-bottom: 10px;
}

.user-message {
  text-align: right;
  color: #409EFF;
}

.ai-message {
  text-align: left;
  color: #67C23A;
}

.scrollbar-wrapper {
  height: 100%;
}

.el-input {
  font-size: 18px; /* 放大字体 */
}

.el-button {
  font-size: 16px; /* 放大按钮字体 */
}
</style>