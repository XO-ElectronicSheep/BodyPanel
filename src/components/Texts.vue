<template>
    <div class="inputaa">
        <el-input v-model="input2" class="w-50 m-2" placeholder="title搜索" :prefix-icon="Search" @change="getInput" />
    </div>
    <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="radio" class="ml-4" @change="getLabelName">
            <el-radio size="large" v-for="item in WebName.data" :key="String(item.ID)" :label="String(item.ID)">{{
                item.WebName
            }}</el-radio>
        </el-radio-group>
    </div>
    <el-table :data="list.data" style="width: 100%" height="auto">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="title" label="title"></el-table-column>
        <el-table-column prop="description" label="description"></el-table-column>
        <el-table-column prop="keywords" label="keywords"></el-table-column>
        <el-table-column prop="content" label="案例内容" class="content-sd" height="100" width="600"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="editRow(scope.row)">
                    修改
                </el-button>
                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row.ID)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="修改文章" @close="delDialog" @open="judgementForm">
        <el-form :model="formWebName">
            <el-form-item label="title">
                <el-input v-model="formWebName.value.title" />
            </el-form-item>
            <el-form-item label="keywords">
                <el-input v-model="formWebName.value.keywords" />
            </el-form-item>
            <el-form-item label="description">
                <el-input v-model="formWebName.value.description" />
            </el-form-item>
            <el-form-item label="content" style="margin: 20px 0">
                <BasicEditor :content="WebName.contentacc" @update:valueHtml="handleValueUpdate"
                    v-if="showChildComponent" />
            </el-form-item>
            <el-form-item label="alt">
                <el-input v-model="formWebName.value.alt" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="gettext">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="idslog" title="添加文章" @close="delDialog2" @open="judgementForm2">
        <el-form :model="formWebNamec">
            <el-form-item label="title">
                <el-input v-model="formWebNamec.title" required />
            </el-form-item>
            <el-form-item label="keywords">
                <el-input v-model="formWebNamec.keywords" required />
            </el-form-item>
            <el-form-item label="description">
                <el-input v-model="formWebNamec.description" required />
            </el-form-item>
            <el-form-item label="content" style="margin: 20px 0">
                <BasicEditor :content="formWebNamec.content" @update:valueHtml2="handleValueUpdate2"
                    v-if="showChildComponent2" />
            </el-form-item>
            <el-form-item label="alt">
                <el-input v-model="formWebNamec.alt" required />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="putccd">取消</el-button>
                <el-button type="primary" @click="gettext2">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-pagination background layout="prev, pager, next" :total="list.totalPages" @current-change="getPage"
        :current-page="WebName.currentPage" />
    <div class="aaaa">
        <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加</el-button>
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue';
import { GetData, GetSqlName, Select, DeleteSql, UpDate, Insert } from '../service/user'
import { ElMessage } from 'element-plus'
import BasicEditor from './BasicEditor.vue'

components: { BasicEditor }
const radio = ref("1")
const input2 = ref('')
const showChildComponent = ref(false)
/* const handleChange = (file, fileList) => {
    //this.form.image = file;
    formWebName.value.image = file
    console.log(formWebName)
    console.log(file)
} */

const formWebNamec = reactive({
    title: "",
    keywords: "",
    description: "",
    alt: "",
    content: "请输入"
})

const list = reactive({
    data: "",
    page: "",
    totalPages: ""
})
const WebName = reactive({
    data: [],
    webName: 'HaoYunChe',
    currentPage: 1,
    contentacc: ''
})

const dialogFormVisible = ref(false)

const formWebName = reactive({

})
const editRow = (row) => {
    dialogFormVisible.value = true;
    showChildComponent.value = true
    formWebName.value = row
    // 编辑行的逻辑处理
    console.log('编辑行', row, formWebName);
    WebName.contentacc = ref(formWebName.value.content)
    console.log(formWebName.value.content)
    console.log(WebName.contentacc)
}


const delDialog = () => {
    showChildComponent.value = false
}
const deleteRow = async (ID) => {
    //删除行
    const data = await DeleteSql({
        params: {
            ID,
            WebName: WebName.webName
        },
    })

    ElMessage({
        type: 'success',
        message: '删除成功',
    })

    //更新数据
    if (!input2.value) {
        const { data } = await GetData({
            params: {
                page: WebName.currentPage - 1,
                WebName: WebName.webName
            },
        })
        list.data = data.data
        list.page = data.currentPage
        list.totalPages = Number(data.totalPages) * 10
    } else {
        const { data } = await Select({
            params: {
                page: WebName.currentPage,
                WebName: WebName.webName,
                title: input2.value
            },
        })
        list.data = data.data
        list.page = data.currentPage
        list.totalPages = Number(data.totalPages) * 10
    }

}


// 在组件挂载后执行操作
onMounted(async () => {
    //获取到数据库表
    const sqlName = await GetSqlName();
    WebName.data = sqlName.data
    console.log(WebName)
    //获取到初始数据表
    const { data } = await GetData({
        params: {
            page: 0,
            WebName: WebName.data[0].SqlName
        },
    })
    list.data = data.data
    list.page = data.page + 1
    list.totalPages = Number(data.totalPages) * 10
    console.log(list)
});


const handleValueUpdate = (newValue) => {
    // 获取子组件传递的新值
    console.log("acc", newValue);
    formWebName.value.content = newValue
    console.log(formWebName)
}



const handleValueUpdate2 = (newValue) => {
    // 获取子组件传递的新值
    console.log("accdddd", newValue);
    formWebNamec.content = newValue
    console.log("aaaaaaaa", formWebNamec)
}


/* 搜索 */
const getInput = async (value) => {
    WebName.currentPage = 1
    const { data } = await Select({
        params: {
            page: 1,
            WebName: WebName.webName,
            title: value
        },
    })
    list.data = data.data
    list.page = data.currentPage
    list.totalPages = Number(data.totalPages) * 10
}

const getPage = async (value) => {
    console.log(input2.value)
    if (!input2.value) {
        WebName.currentPage = Number(value)
        const { data } = await GetData({
            params: {
                page: value - 1,
                WebName: WebName.webName
            },
        })
        list.data = data.data
    } else {
        WebName.currentPage = Number(value)
        const { data } = await Select({
            params: {
                page: WebName.currentPage,
                WebName: WebName.webName,
                title: input2.value
            },
        })
        list.data = data.data
        list.page = data.currentPage
        list.totalPages = Number(data.totalPages) * 10
    }
}

const putccd = () => {
    idslog.value = false,
        formWebNamec.title = '',
        formWebNamec.keywords = "",
        formWebNamec.description = "",
        formWebNamec.alt = "",
        formWebNamec.content = "请输入"
    showChildComponent2.value = false
}

const getLabelName = async (value) => {
    radio.value = value
    WebName.currentPage = 1
    const { data } = await GetData({
        params: {
            page: 0,
            WebName: WebName.data[value - 1].SqlName
        },
    })
    WebName.webName = WebName.data[value - 1].SqlName
    list.data = data.data
    list.totalPages = Number(data.totalPages) * 10
    console.log(WebName.webName)
}


const numBerac = ref(false)
const judgementForm = () => {

    //新增或修改判断
    if (formWebName.value.alt) {
        numBerac.value = true
    } else {
        numBerac.value = false
    }
}

const idslog = ref(false)
const showChildComponent2 = ref(false)
const dialogFormVisible2 = ref(false)


const onAddItem = () => {
    idslog.value = true
    showChildComponent2.value = true

}
const delDialog2 = () => {
    showChildComponent.value = false
}
const judgementForm2 = () => {
    //新增或修改判断

}

//修改
const gettext = async () => {
    dialogFormVisible.value = false
    showChildComponent.value = false
    console.log("修改", formWebName)
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    const { ID, alt, content, description, keywords, title } = formWebName.value
    await UpDate({
        "WebName": WebName.webName,
        "id": ID,
        "alt": alt,
        "content": content,
        "description": description,
        "keywords": keywords,
        "title": title,
        "date": formattedDate
    })
    console.log(WebName.webName)
}

const gettext2 = async () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    console.log(formWebNamec)
    const { alt, content, description, keywords, title } = formWebNamec
    await Insert({
        "WebName": WebName.webName,
        "alt": alt,
        "content": content,
        "description": description,
        "keywords": keywords,
        "title": title,
        "date": formattedDate
    })
    idslog.value = false
    formWebNamec.title = '',
        formWebNamec.keywords = "",
        formWebNamec.description = "",
        formWebNamec.alt = "",
        formWebNamec.content = "请输入"
    showChildComponent2.value = false


    //更新数据
    if (!input2.value) {
        const { data } = await GetData({
            params: {
                page: WebName.currentPage - 1,
                WebName: WebName.webName
            },
        })
        list.data = data.data
        list.page = data.currentPage
        list.totalPages = Number(data.totalPages) * 10
    } else {
        const { data } = await Select({
            params: {
                page: WebName.currentPage,
                WebName: WebName.webName,
                title: input2.value
            },
        })
        list.data = data.data
        list.page = data.currentPage
        list.totalPages = Number(data.totalPages) * 10
    }

}
</script>

<style scoped>
.el-table-column {
    width: 100px !important;
    white-space: nowrap !important;
    /* 防止文本换行 */
    overflow: hidden !important;
    /* 隐藏超出容器的内容 */
    text-overflow: ellipsis !important;
    /* 使用省略号替代超出容器的文本 */
}

.el-pagination {
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
}

.aaaa {
    width: 100px;
    margin: 0 auto;
}

.mt-4 {
    background-color: #f0f2f5;
    color: #5faaff;
}

.inputaa {
    width: 30%;
    margin: auto;
}
</style>
