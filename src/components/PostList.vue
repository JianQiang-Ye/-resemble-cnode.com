<template>
  <div id="main">
    <div class="postList">
      <ul>
        <li>
          <span class="active">全部</span><span>精华</span><span>分享</span><span>问答</span><span>招聘</span><span>客户端测试</span>
        </li>
        <li v-for="item in items">
          <img :src="item.author.avatar_url" class="avatar">
          <div class="countWrapper">
            <span class="count_of_replies">{{item.reply_count}}</span><span class="count_of_slash">/</span><span class="count_of_visit">{{item.visit_count}}</span>
          </div>
          <span :class="{'put-good':item.good, 'put-top':item.top, 'tab': (item.good!==true&&item.top!==true) }">{{item | tabFormatter}}</span>
          <router-link :to="{name:'Article',params:{articleId: item.id}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_time">{{item.last_reply_at | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
    export default {
      name: "post-list",
      data(){
          return {
            items: []
          }
      },
      methods:{
        getData(){
            this.$http.get('https://cnodejs.org/api/v1/topics').then((res)=>{
              this.items = res.data.data
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
  }
  ul>li:first-child{
    background-color: #f6f6f6;
  }
  ul>li:first-child span{
    margin: 0 10px;
    color: #80bd01;
    font-size: 14px;
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
