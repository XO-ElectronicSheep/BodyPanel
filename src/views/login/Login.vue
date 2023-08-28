<template>
    <div class="login-back">
        <div class="login">
            <h2 class="biaoti">
                Body Panel
            </h2>
            <el-form :label-position="labelPosition" :model="formLabelAlign" style="max-width: 560px">
                <el-form-item>
                    <el-input v-model="formLabelAlign.name" placeholder="邮箱" :prefix-icon="Message"
                        :input-style="inputStyle" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLabelAlign.region" placeholder="密码" :prefix-icon="Lock"
                        :input-style="inputStyle" />
                </el-form-item>
            </el-form>
            <div class="button-c">
                <el-button-group>
                    <el-button type="primary" size="large" color="#ffffff44">登录</el-button>
                    <el-button type="primary" size="large" color="#ffffff44">注册</el-button>
                </el-button-group>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Message, Lock } from '@element-plus/icons-vue'
const labelPosition = ref('right')

const inputStyle = "backgroundColor:#ffffff5e;opacity: 0.65;width:80%;height:3rem;margin: auto;"

const formLabelAlign = reactive({
    name: '',
    password: ''
})

</script>
<style scoped>
.login-back {
    color: #83838365;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    margin: 0;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #ff000036, #00ff0044, #0000ff3f);
    /* 设置渐变颜色 */
    background-size: 200% 100%;
    /* 设置渐变的尺寸 */
    animation: flow 20s linear infinite;
    /* 设置动画效果 */
}

@keyframes flow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}


.login {
    background-color: #ffffff5e;
    border-radius: 40px;
    width: 30rem;
    height: 25rem;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    color: #0000009f;
}

.biaoti {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    font-size: 2rem;
    margin-bottom: 0;
}

.el-form {
    width: 100%;
}

.button-c {
    width: 100%;
    text-align: center;
    color: #dfdedea1;
}
</style>