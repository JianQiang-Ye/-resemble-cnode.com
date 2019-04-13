// 路由配置文件
import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'PostList',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
    name: 'Article',
    path: '/topic/:articleId',
    components: {
      main: Article
      }
    },
    {
      name: 'User_info',
      path: '/user/:name',
      components: {
        main: UserInfo
      }
    }
  ]
})
