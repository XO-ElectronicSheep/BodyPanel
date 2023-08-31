<template>
    <div class="login-back">
        <div class="login">
            <h2 class="biaoti">
                Body Panel DEV
            </h2>
            <div class="login-2">
                <el-form :model="formLabelAlign">
                    <el-form-item>
                        <el-input v-model="formLabelAlign.email" placeholder="邮箱" :prefix-icon="Message"
                            :input-style="inputStyle" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formLabelAlign.password" placeholder="密码" :prefix-icon="Lock"
                            :input-style="inputStyle" show-password />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="large" color="#ffffff5e" @click="submitForm">
                            登录
                        </el-button>
                        <el-button size="large" color="#ffffff5e">
                            注册
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script setup  >
import { reactive } from 'vue'
import { Message, Lock } from '@element-plus/icons-vue'
import { login } from '../../service/user'
import md5 from 'js-md5'
import { useRouter } from "vue-router";

const router = useRouter()

const inputStyle = "backgroundColor:##ffffff5e;opacity: 0.65;width:100%;height:3rem;margin: 0;"

const formLabelAlign = reactive({
    email: '',
    password: ''
})


const submitForm = async () => {
    /* 输入框为空 */
    if (formLabelAlign.email == '' || formLabelAlign.password == '') {
        return ElMessage({
            message: '用户名或密码不能为空',
            grouping: true,
            type: 'error',
        })
    }

    /* 邮箱格式验证 */
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.test(formLabelAlign.email)) {
        return ElMessage({
            message: '请输入正确的邮箱',
            grouping: true,
            type: 'error',
        })
    }

    /* 密码合适验证 8位字符 包含大小写和特殊字符 */
    const password = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
    if (!password.test(formLabelAlign.password)) {
        return ElMessage({
            message: '密码包含大小写字母、数字和特殊字符且最小位8位',
            grouping: true,
            type: 'error',
        })
    }


    const { data } = await login({
        'username': formLabelAlign.email,
        'password': md5(formLabelAlign.password)
    })
    localStorage.setItem('token', data.token);

    router.push({
        path: '/forward',
        query: {
            username: formLabelAlign.email,
            token: localStorage.getItem('token')

        }
    })
}
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
    text-align: center;
    color: #0000009f;
    border: #ffffff5e solid 0.1rem;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.2);
}

.biaoti {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    font-size: 2rem;
    margin-bottom: 2.5rem;
}

.login-2 {
    width: 100%;
}

.el-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


.el-form-item {
    width: 80%;
}

.el-form-item:last-child {
    margin-top: 2rem;
    width: auto;

}
</style>