<template>
  <div id="app">
    <HeaderList></HeaderList>
    <div class="main">
      <router-view name="slidebar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import HeaderList from './components/HeaderList'
import PostList from './components/PostList'
export default {
  name: 'App',
  components: {
    HeaderList,
    PostList
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0
  }
  #app {

  }
  ul{
    list-style: none;
  }
  .main{
    padding:15px 76px;
    background-color: #e1e1e1;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
</style>
