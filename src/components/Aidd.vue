<template>
    <el-input v-model="textarea" :rows="10" type="textarea" placeholder="AI原文" />
    <div class="btn">
        <el-button type="primary" @click="getAi">点击加工</el-button>
    </div>
    <el-input v-model="AiTextarea" :rows="10" type="textarea" placeholder="修改后的文章" />
</template>

<script  setup>
import { ref } from 'vue'
import axios from 'axios';
const textarea = ref('')
const AiTextarea = ref('')


const getAi = async () => {
    try {
        const response = await axios.post('http://124.220.23.104:4104/process-text', textarea.value, {
            headers: { 'Content-Type': 'text/plain' }
        });
        AiTextarea.value = response.data.replacedText
        // console.log(response);
    } catch (error) {
        console.log(error);
    }
};

</script>

<style scoped>
.btn {
    margin-top: 10px;
}
</style>
