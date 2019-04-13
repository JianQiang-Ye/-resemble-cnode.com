<template>
    <div class="slidebar">
      <div class="author panel">
        <div class="header">作者</div>
        <div class="author_content content">
          <router-link :to="{name: 'User_info',params:{name: author.loginname}}">
            <img :src="author.avatar_url" alt="">
          </router-link>
          <router-link :to="{name: 'User_info',params:{name: author.loginname}}">
            <span>{{author.loginname}}</span>
          </router-link>
          <p>积分： {{author.score}}</p>
          <p>github: <a :href="'https://github.com/' + author.githubUsername" target="_blank">{{author.githubUsername}}</a></p>
        </div>
      </div>
      <div class="panel">
        <div class="header">作者其他的话题</div>
          <div class="panelInner content" v-for="item in recent_topics">
            <router-link :to="{
                name: 'Article',
                params: {
                  articleId: item.id,
                  name: item.author.loginname
                }
              }">
                {{item.title}}
            </router-link>
          </div>
      </div>
      <div class="panel">
        <div class="header">作者最近回复的话题</div>
        <div class="panelInner content" v-for="item in reply_topics">
          <router-link :to="{
                name: 'Article',
                params: {
                  articleId: item.id,
                  name: item.author.loginname
                }
              }">
            {{item.title}}
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "slidebar",
      data(){
        return {
          author:{}
        }
      },
      computed:{
        recent_topics(){
          if(this.author.recent_topics){
            return this.author.recent_topics.slice(0,5)
          }
        },
        reply_topics(){
          if(this.author.recent_replies){
            return this.author.recent_replies.slice(0,5)
          }
        }
      },
      methods: {
        getData(){
          this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`).then((res)=>{
            if(res.status === 200 && res.data.success === true){
              this.author = res.data.data
              console.log(res)
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
      beforeMount(){
        this.getData()
      }
    }
</script>

<style scoped>
  div.slidebar{
    float: right;
  }
  .slidebar .panel{
    width: 290px;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  .slidebar .panel .header{
    background-color: #f6f6f6;
    padding: 10px;
    font-size: 13px;
  }
  .slidebar .panel .content{
    background-color: white;
    padding: 10px;
  }
  .slidebar .panel .author_content img{
    height: 50px;
    width: 50px;
    border-radius: 4px;
    vertical-align: middle;
  }
  .slidebar .panel .author_content>span{
    vertical-align: middle;
    color: #666;
    margin-left: 5px;
  }
  .slidebar .panel .author_content p{
    font-size: 14px;
    margin-top: 10px;
  }
  .slidebar .panel .panelInner{
    border-top: 1px solid #eee;
    font-size: 12px;
    color: #778087;
  }
</style>
