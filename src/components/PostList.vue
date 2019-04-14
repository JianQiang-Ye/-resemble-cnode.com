<template>
  <div id="main">
    <div class="postList">
      <ul>
        <li @click="topics_tab">
          <span v-for="item in topicsLists" :class="{'active':item===zh_tab}">{{item}}</span>
        </li>
        <li v-for="item in items">
          <router-link :to="{name: 'User_info',params:{name: item.author.loginname}}">
            <img :src="item.author.avatar_url" class="avatar" :alt="item.author.loginname">
          </router-link>
          <div class="countWrapper">
            <span class="count_of_replies">{{item.reply_count}}</span><span class="count_of_slash">/</span><span class="count_of_visit">{{item.visit_count}}</span>
          </div>
          <span :class="{'put-good':item.good, 'put-top':item.top, 'tab': (item.good!==true&&item.top!==true) }">{{item | tabFormatter}}</span>
          <router-link :to="{name:'Article',params:{articleId: item.id,name: item.author.loginname}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_time">{{item.last_reply_at | formatDate}}</span>
        </li>
      </ul>
      <Pagination @page="handlePage"></Pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination'
    export default {
      name: "post-list",
      components:{
        Pagination
      },
      data(){
          return {
            items: [],
            topicsLists: ['全部','精华','分享','问答','招聘'],
            page: 1,
            tab: 'all',
            zh_tab: '全部'
          }
      },
      methods:{
        getData(page,tab){
            this.$http.get('https://cnodejs.org/api/v1/topics',{params:{page,limit:20,tab}}).then((res)=>{
              this.items = res.data.data
            }).catch((err)=>{
              console.log(err)
            })
        },
        handlePage(page){
          this.page = page
          this.getData(this.page,this.tab)
        },
        topics_tab(e){
          switch (e.target.innerText){
            case '全部':
              this.tab = 'all'
              this.zh_tab = '全部'
              this.getData(this.page,this.tab)
              break
            case '精华':
              this.tab = 'good'
              this.zh_tab = '精华'
              this.getData(this.page,this.tab)
              break
            case '分享':
              this.tab = 'share'
              this.zh_tab = '分享'
              this.getData(this.page,this.tab)
              break
            case '问答':
              this.tab = 'ask'
              this.zh_tab = '问答'
              this.getData(this.page,this.tab)
              break
            case '招聘':
              this.tab = 'job'
              this.zh_tab = '招聘'
              this.getData(this.page,this.tab)
              break
            default:
              return;
          }
        }
      },
      beforeMount(){
        this.getData()
      }
    }
</script>

<style scoped>
  #main{
  }
  div.postList{
    max-width: 1062px;
    background-color: #ffffff;
  }
  img.avatar{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    font-size: 12px;
    color: #666;
  }
  ul>li:first-child{
    background-color: #f6f6f6;
  }
  ul>li:first-child span{
    margin: 0 10px;
    color: #80bd01;
    font-size: 14px;
    cursor: pointer;
  }
  ul li:first-child .active{
    background-color: #80bd01;
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
  }
  ul>li{
    border-top:1px solid #eee;
    font-size: 16px;
    color: #333;
    padding: 10px;
    position: relative;
  }
  ul>li:hover{
    background-color: #f5f5f5;
    transition: all 0.1s;
  }
  ul li span.last_time{
    font-size: 11px;
    color: #778087;
    position:absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  ul li span.title{
    vertical-align: middle;
  }
  ul li .countWrapper{
    display: inline-block;
    width: 70px;
    text-align: center;
  }
  span.count_of_replies{
    color: #9e78c0;
    font-size: 14px;
  }
  span.count_of_visit{
    color: #b4b4b4;
    font-size: 10px;
  }
  span.count_of_slash{
    font-size: 10px;
    margin: 0 2px;
  }
  ul li span.put-top, ul li span.put-good{
    background-color: #80bd01;
    color: white;
    font-size:12px;
    padding: 2px 4px;
    border-radius: 4px;
  }
  ul li span.tab{
    font-size: 12px;
    background-color: #e5e5e5;
    color: #999999;
    padding: 2px 4px;
    border-radius: 4px;
  }
</style>
