<template>
    <div id="pagination">
      <ul class="clearfix">
        <li v-for="value in lists" @click="getValue(value)" :class="{'active':currentPage===value}">
          {{value}}
        </li>
        <li @click="getValue(71)">»</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "pagination",
      data(){
          return {
            lists: [1,2,3,4,5,'...'],
            currentPage: 1
          }
      },
      methods: {
        getValue(page){
         if(typeof page === 'number'){
           this.currentPage = page
           if(page>=5 && page<=69){
             this.lists = [1,'...',page-2,page-1,page,page+1,page+2,'...']
           }else if(page<5){
             this.lists = [1,2,3,4,5,'...']
           }else{
             this.lists = [1,'...',69,70,71]
           }
           this.$emit('page',page)
         }
        }
      }
    }
</script>

<style scoped>
  #pagination{
    display: inline-block;
    vertical-align: top;
    padding: 10px;
  }
  .clearfix{
    content:'';
    clear: both;
    display: block;
  }
  ul li{
    border: 1px solid #eee;
    box-sizing: border-box;
    background-color: white;
    width: 30px;
    height: 30px;
    float: left;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }
  ul li:hover{
    background-color: #f5f5f5;
  }
  ul li.active{
    color: #80bd01;
    font-weight: bold;
  }
</style>
