<template>
  <div class="content" >
    <div v-if="isLoading">

    </div>
      <div v-else>
        <div class="topic_header" >
          <div class="topic_full_title">
            <span :class="{'put-good':article.good, 'put-top':article.top, 'tab': (article.good!==true&&article.top!==true) }">{{article | tabFormatter}}</span>
            <span class="article_title">{{article.title}}</span>
          </div>
          <div class="changes">
            <span> 发布于 {{article['create_at'] | formatDate}}</span>
            <router-link :to="{name: 'User_info',params:{name: article.author.loginname}}">
              <span> 作者 {{article.author.loginname}}</span>
            </router-link>
            <span> {{article['visit_count']}}次浏览</span>
            <span> 最后一次回复是 {{article['last_reply_at'] | formatDate}}</span>
            <span> 来自 {{ articleTab }}</span>
          </div>
        </div>
        <div v-html="article.content" class="topic_content" id="content"></div>
        <div class="reply">
          <div class="header">
            <span>{{article.reply_count}} 回复</span>
          </div>
          <ul>
            <li v-for="(reply,index) in replies" class="reply">
              <div class="user_info">
                <router-link :to="{name: 'User_info',params:{name: reply.author.loginname}}">
                  <img :src="reply.author.avatar_url" alt="" :title="reply.author.loginname">
                </router-link>
                <router-link :to="{name: 'User_info',params:{name: reply.author.loginname}}">
                  <span>{{reply.author.loginname}}</span>
                </router-link>
                <span>{{index + 1}} 楼</span>
                <span>{{reply.create_at | formatDate}}</span>
                <span v-if="reply.author.loginname === article.author.loginname" class="host">楼主</span>
                <div class="ups" v-if="reply.ups.length!==0"> {{reply.ups.length}} 👍</div>
              </div>
              <div class="reply_content">
                <div v-html="reply.content" id="content"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
      name: "article",
      data(){
        return {
          article: {},
          articleId: '',
          isLoading: false,
          replies: []
        }
      },
      methods:{
        getData(){
          this.articleId = this.$route.params.articleId
          this.$http.get(`https://cnodejs.org/api/v1/topic/${this.articleId}`,{mdrender:true}).then((res)=>{
            if(res.data.success == true){
              this.isLoading = false
              this.article = res.data.data
              this.replies = res.data.data.replies
              console.log("this.article")
              console.log(this.article)
            }

          }).catch((err)=>{
            console.log(err)
          })
        }
      },
      computed:{
        articleTab(){
          switch(this.article.tab)
          {
            case 'share':
              return '分享'
              break;
            case 'ask':
              return '问答'
              break;
            case 'job':
                return '招聘'
              break;
            default:
              return '其他'
          }
        }
      },
      beforeMount(){
        this.isLoading = true
        this.getData()
      },
      watch: {
        '$route'(to,from){
          this.getData()
        }
      }
    }
</script>

<style scoped>
  @import url('../assets/markdown-github.css');
  div.content{
    max-width: 1062px;
  }
  div.content .topic_header{
    padding: 10px;
    background-color: white;
    border-radius: 2px;
  }
  div.topic_full_title span.put-top, ul li span.put-good{
    background-color: #80bd01;
    color: white;
    font-size:12px;
    padding: 2px 4px;
    border-radius: 4px;
  }
  div.topic_full_title span.tab{
    font-size: 12px;
    background-color: #e5e5e5;
    color: #999999;
    padding: 2px 4px;
    border-radius: 4px;
  }
  div.topic_full_title span.article_title{
    font-size: 22px;
    font-weight: 700;
    color: #333
  }
  div.topic_header div.changes span::before{
    content: "•";
  }
  div.topic_header div.changes span{
    font-size: 12px;
    color: #838383;
  }
  .markdown-text img {
    width: 92% !important;
  }
  .topic_content{
    padding: 10px 15px;
    border-top: 1px solid #ccc;
    background-color: white;
    border-radius: 2px;
  }
  div.header{
    background-color: #f6f6f6;
    margin-top: 12px;
    font-size: 14px;
    color: #444;
    padding: 10px;
    border-radius: 2px;
  }
  ul>li.reply{
    padding: 10px;
    position: relative;
  }
  ul>li.reply{
    border-top: 1px solid #eee;
    background-color: #fff;
  }
  ul>li>div.user_info{
    height: 20px;
    position: relative;
  }
  ul>li>div.user_info img{
    height: 30px;
    width: 30px;
    vertical-align: top;
  }
  ul>li>div.user_info span{
    vertical-align: top;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    margin-left: 5px;
  }
  ul>li>div.user_info>div.ups{
    position: absolute;
    right: 0;
    top: 0;
    color: #666;
    font-size: 12px;
  }
  ul>li>div.reply_content{
    padding-left: 50px;
  }
  ul>li .user_info span.host{
    background-color: #6ba44e;
    color: white;
    padding: 2px;
    border-radius: 2px;
    font-weight: normal;
  }
</style>
