import axios from './axios';

export default {
    //栏目列表查询
    Topiclist(params) {
        return axios.post('/access/ui/FRONT-COMM/FRONTCOMMCMS020', params);
    },
    //文章列表查询
    articlelist(params) {
        return axios.post('/access/ui/FRONT-COMM/FRONTCOMMCMS030', params);
    },
     //文章详情查询
    articledetail(params) {
        return axios.post('/access/ui/FRONT-COMM/FRONTCOMMCMS040', params);
    },
    //文章停用/启用
    articlestart(params) {
        return axios.post('/access/ui/GTC-MGR/GTCMGRCMSARTICLESERVICE003', params);
    },
     //保存文章
    savestart(params) {
        return axios.post('/access/ui/GTC-MGR/GTCMGRCMSARTICLESERVICE001', params);
    },
};