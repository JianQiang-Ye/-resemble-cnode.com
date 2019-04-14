<template>
    <div class="header">
      <div class="nav">
        <div class="nav-left">
          <router-link :to="{name: 'PostList'}">
            <img src="../assets/cnodejs_light.svg" alt="logo">
          </router-link>
        </div>
        <div class="nav-right">
          <ul class="clearfix">
            <li><router-link :to="{name: 'PostList'}">
              <a href="javascript:;">首页</a></router-link>
            </li>
            <li><a href="https://cnodejs.org/getstart" target="_blank">新手入门</a></li>
            <li><a href="https://cnodejs.org/api" target="_blank">API</a></li>
            <li><a href="https://cnodejs.org/about" target="_blank">关于</a></li>
            <li><a href="">注册</a></li>
            <li><a href="">登录</a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderList"
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0
  }
  .header{
  height: 50px;
  background-color: #444444;
  }
  .nav{
    padding: 5px 75px;
  }
  .nav .nav-left{
    display: inline-block;
    margin-top: 2px;
  }
  .nav .nav-right{
    display: inline-block;
    float: right;
  }
  img{
    width: 120px;
    height: 30px;
  }
  ul{
    list-style: none;
  }
  ul > li {
    float: left;
    padding: 10px 15px ;
  }
  ul > li > a{
    color: #ccc;
    text-decoration: none;
    font-size: 13px;
  }
  .clearfix{
    content: '';
    display: block;
    clear: both;
  }
</style>
