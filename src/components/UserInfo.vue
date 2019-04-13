<template>
  <div class="content">
    <div class="panel">
      <div class="header">
        主页
      </div>
      <div class="userinfo">
        <img :src="user.avatar_url" alt="">
        <span>{{user.loginname}}</span>
        <div>
          {{user.score}} 积分
        </div>
        <div class="dark">
          github: <a :href="'https://github.com/' + user.githubUsername" target="_blank">{{user.githubUsername}}</a>
        </div>
        <div class="createTime">
          注册时间 {{user.create_at | formatDate}}
        </div>
      </div>
    </div>
    <div class="panel .recentCreateTopics">
      <div class="header">
        最近创建的话题
      </div>
        <ul>
          <li v-for="item in recent_topics">
            <router-link :to="{name: 'User_info',params:{name: item.author.loginname}}">
              <img :src="item.author.avatar_url" class="avatar" :alt="item.author.loginname">
            </router-link>
            <router-link :to="{name: 'Article',params:{articleId:item.id}}">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="last_reply">{{item.last_reply_at | formatDate}}</span>
          </li>
        </ul>
    </div>
    <div class="panel">
      <div class="header">
        最近回复的话题
      </div>
      <ul>
        <li v-for="item in user.recent_replies">
          <router-link :to="{name: 'User_info',params:{name: item.author.loginname}}">
            <img :src="item.author.avatar_url" class="avatar" :alt="item.author.loginname">
          </router-link>
          <router-link :to="{name: 'Article',params:{articleId:item.id}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_reply">{{item.last_reply_at | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "user-info",
      data(){
        return {
          user: {},
          recent_topics:[]
        }
      },
      methods: {
        getData(){
          this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`).then((res)=>{
            if(res.status === 200 && res.data.success === true){
              this.user = res.data.data
              this.recent_topics = this.user.recent_topics
              console.log(res)
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
      computed:{
        getRecentTopicsInFive(){
          if(this.recent_topics){
            return this.recent_topics.slice(0,5)
          }
        }
      },
      beforeMount(){
        this.getData()
      },
      watch: {
        '$route' (to, from) { //监听路由是否变化
          if(this.$route.params.name){//判断id是否有值
            console.log(this.$route.params.name)
            this.getData()
          }
        }
      }
    }
</script>

<style scoped>
  div.content{
    max-width: 1062px;
  }
  div.header{
    background-color: #f6f6f6;
    margin-top: 12px;
    font-size: 14px;
    color: #444;
    padding: 10px;
    border-radius: 2px;
  }
  .panel div.userinfo{
    border-top: 1px solid #eee;
    background-color: #fff;
    padding: 10px;
  }
  .panel div.userinfo>img{
    height: 50px;
    width: 50px;
    vertical-align: top;
    border-radius: 5px;
  }
  .panel div.userinfo>span{
    vertical-align: top;
    color: #666;
    font-size: 14px;
    margin-left: 5px;
  }
  .panel div.userinfo {
    font-size: 14px;
  }
  .panel div.userinfo>div{
    margin-top: 10px;
  }
  .panel div.userinfo>div.createTime{
    color: #ccc;
  }
  .panel div.userinfo>div.dark{
    color: #666;
  }
  ul li {
    border-top: 1px solid #eee;
    background-color: #fff;
    padding: 10px;
    position: relative;
  }
  ul li img.avatar{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    font-size:12px;
    color:#666;
  }
  ul li span.title{
    color: #0088cc
  }
  ul li span.title:hover{
    color: grey;
    text-decoration: underline;
  }
  ul li span.last_reply{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #666;
  }
</style>
