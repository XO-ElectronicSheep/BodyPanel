<template>
    <el-table :data="acc.data" style="width: 100%">
        <el-table-column prop="webname" label="网站转化名" width="100" />
        <el-table-column prop="cars" label="车辆信息" width="100" />
        <el-table-column prop="come" label="出发地" width="150" />
        <el-table-column prop="place" label="终点地" width="150" />
        <el-table-column prop="tel" label="电话" width="180" />
        <el-table-column prop="timestamp" label="时间点" width="180" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="postRow(scope.row)" v-if="scope.row.isUsers">
                    点击消息
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="回访信息保留" prop="return_visit_information" width="120" />
        <el-table-column label="编辑">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="showRow(scope.row)">
                    回访信息
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="回访信息保留填写" width="30%" :before-close="handleClose">
        <el-input v-model="acc.textarea" autocomplete="off" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="PustTextGoServer">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>



    <div class="acc">
        <el-pagination background layout="prev, pager, next" :total="acc.totalPages * 10" @current-change="updatePage" />
    </div>
</template>

<script setup>
import { GetUsers, isUsers, updateReturnVisitInformation } from '../service/user'
import { onMounted, reactive, ref } from 'vue'

const dialogVisible = ref(false)

const dialogFormVisible = reactive(false)


const acc = reactive({
    data: [],
    page: '',
    totalPages: '',
    textarea: '',
    total: 0,
    id: 0
})

onMounted(async () => {
    const { data } = await GetUsers({
        page: 0,
    })
    acc.data = data.data
    acc.page = data.page
    acc.totalPages = data.totalPages
    console.log(data)
});


const postRow = async (row) => {
    console.log(acc.data)
    console.log(row.isUsers)
    await isUsers({
        id: row.id
    })
    row.isUsers = 0
}

const showRow = (row) => {
    console.log(row)
    dialogVisible.value = true
    acc.textarea = row.return_visit_information
    acc.id = row.id
    console.log(acc)
}


const updatePage = async (index) => {
    console.log(index)
    const { data } = await GetUsers({
        page: index - 1,
    })
    acc.data = data.data
    acc.page = data.page
    acc.totalPages = data.totalPages
}

const PustTextGoServer = async () => {
    await updateReturnVisitInformation({
        id: acc.id,
        returnVisitInformation: acc.textarea
    })
    dialogVisible.value = false
    const { data } = await GetUsers({
        page: acc.page,
    })
    acc.data = data.data
    acc.totalPages = data.totalPages

    console.log(acc.textarea, acc.id)
}
</script>

<style scoped>
.acc {
    width: 300px;
    text-align: center;
    margin: auto;
    margin-top: 20px;
}
</style>
