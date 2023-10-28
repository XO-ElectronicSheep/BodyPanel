import axios from './axios'
// 添加请求信息  _login为封装之后的post请求 data 为请求中携带的参数


// 登录
export function login(params) {
    return axios.post('/api/login', params);
}

//新增文章内容，存入数据库
export function Insert(params) {
    return axios.post('/text/insertData', params);
}

//文章案例切片获取
export function GetData(params) {
    return axios.get('/text/getData', params);
}

//修改文章根据ID查询
export function UpDate(params) {
    return axios.post('/text/update', params);
}

/* 根据日期查询当天的文章内容 */
export function Select(params) {
    return axios.get('/text/select', params);
}

/* 定义接口路由，获取数据片和数据片的总数 */
export function GetUser(params) {
    return axios.put('/api/user', params);
}
/* 定义接口路由，获取数据片和数据片的总数 */
export function GetSqlName() {
    return axios.get('/api/sqlName');
}

/* 定义接口路由，获取数据片和数据片的总数 */
export function DeleteSql(params) {
    return axios.delete('/text/delete', params);
}

/* 定义接口路由，获取数据片和数据片的总数 */
export function upImg(params) {
    return axios.post('/text/upload', params);
}

/* 定义接口路由，获取转化用户 */
export function GetUsers(params) {
    return axios.post('/text/user', params);
}


/* 根据id标记用户是否被查看 */
export function isUsers(params) {
    return axios.post('/users/replace', params);
}


/* 根据id标记用户回访 */
export function updateReturnVisitInformation(params) {
    return axios.post('/api/updateReturnVisitInformation', params);
}