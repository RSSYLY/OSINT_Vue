import { defineStore } from 'pinia'

export const useMainStore = defineStore('myStore', {
    state: () => ({
        pageInfo: {
            title: "OSINT",
            // TODO 删除该侧边栏生成方法，改为侧栏自己根据路由配置生成
            drawer:{
                items:[
                    {
                        title:'错误，请检查前端配置',
                    }
                ]
            }
        },
        userInfo: {
            id: 0,
            username: '',
            email: '',
            token: '',
            isSuperuser: false,
            isStaff: false,
            isActive: false,
            dateJoined: '',
            lastLogin: '',
        },
        userStatus: {
            isLogin: false
        },
    })
})
