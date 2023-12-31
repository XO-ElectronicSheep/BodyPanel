<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="1" @click="submitForm(1)">
                        <el-icon>
                            <ChatDotRound />
                        </el-icon>
                        <template #title>案例文章</template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="submitForm(2)">
                        <el-icon>
                            <User />
                        </el-icon>
                        <template #title>转换用户查看</template>
                    </el-menu-item>

                    <el-menu-item index="3" @click="submitForm(3)">
                        <el-icon>
                            <Switch />
                        </el-icon>
                        <template #title>AI文章优化</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>



<script setup>
import { RouterView } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
const list = reactive([
    {
        id: 1,
        title: '编写案例文章',
        icon: '<ChatDotRound />'
    },
    {
        id: 2,
        title: '转换用户查看',
        icon: '<User />'
    }
])

const submitForm = (name) => {
    if (name == 1) {
        router.push({
            path: '/forward',
        })
    } else if (name == 2) {
        router.push({
            path: '/forward/users',
        })
    } else if (name == 3) {
        router.push({
            path: '/forward/ai',
        })
    }

}

onMounted(() => {

    console.log(route)

})

</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100%;
}
</style>
