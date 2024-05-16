<template>
  <div class="story-game">
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <h1>故事接龙</h1>
        <el-card class="box-card">
          <div v-if="story.length" class="story-content">
            <p v-for="paragraph in story" :key="paragraph.id">{{ paragraph.text }}</p>
          </div>
        </el-card>
        <div class="input-area">
          <el-input
              v-model="newParagraph"
              placeholder="请在此输入或通过语音续写故事..."
              @keyup.enter="addParagraph"
              class="input-field"
          ></el-input>
          <el-button
              type="primary"
              icon="el-icon-microphone"
              @click="toggleListening"
              :disabled="listening"
              class="microphone-btn"
          >
            {{ listening ? '正在听写...' : '开始听写' }}
          </el-button>
          <el-button
              type="success"
              @click="addParagraph"
              class="submit-btn"
          >
            添加段落
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: [],
      newParagraph: '',
      listening: false,
      recognition: null
    };
  },
  mounted() {
    this.setupRecognition();
  },
  methods: {
    setupRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'zh-CN';
        this.recognition.interimResults = false;
        this.recognition.continuous = false;
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.newParagraph = transcript;
        };
        this.recognition.onend = () => {
          this.listening = false;
        };
      }
    },
    toggleListening() {
      if (this.listening) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
      this.listening = !this.listening;
    },
    addParagraph() {
      if (this.newParagraph.trim() !== '') {
        const nextId = this.story.length + 1;
        this.story.push({ id: nextId, text: this.newParagraph });
        this.newParagraph = '';
      }
    }
  }
}
</script>

<style scoped>
.story-game {
  margin: 30px;
}
.box-card {
  margin-bottom: 30px;
  background-color: #f9f9f9;
  overflow: auto;
  max-height: 400px;
}
.story-content {
  padding: 20px;
  font-size: 24px;
  color: #333;
  line-height: 2;
  overflow-y: auto;
}
.input-area {
  display: flex;
  align-items: center;
  gap: 20px;
}
.input-field {
  flex-grow: 1;
  height: 50px;
  font-size: 20px;
}
.microphone-btn, .submit-btn {
  flex-shrink: 0;
  width: 150px;
  height: 50px;
  font-size: 18px;
}
</style>