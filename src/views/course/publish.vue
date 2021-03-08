<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <div class="publish">
      <img :src="coursePublish.cover" alt="">
      <div class="main">
        <h2>{{coursePublish.title}}</h2>
        <p><span>共{{coursePublish.lessonNum}}小节</span></p>
        <p><span>所属分类：{{coursePublish.subjectLevelOne}}---{{coursePublish.subjectLevelTwo}}</span></p>
        <p>讲师：{{coursePublish.teacherName}}</p>
        <h3 style="color: red">￥{{coursePublish.price}}</h3>
      </div>
    </div>
    <div>

      <router-link :to="'/course/outline/'+courseId">
        <el-button style="margin-top: 12px;">上一步</el-button>
      </router-link>

      <el-button style="margin-top: 12px; background-color: deepskyblue;color: white" @click="publishCourse">发布课程</el-button>
    </div>

  </div>
</template>

<script>
import course from '../../api/course/course'
export default {
  name: "publish",
  data() {
    return {
      active: 2,
      courseId:'',
      coursePublish:{

      }
    };
  },
  created() {
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      this.showCoursePublish()
    }
  },
  methods: {
    publishCourse(){
      course.publishCourse(this.courseId).then(response => {
        this.$message({
          showClose: true,
          message: '发布成功',
          type: 'success'
        });
      })
    },
    showCoursePublish(){
      course.getCoursePublish(this.courseId).then(response =>{
        this.coursePublish = response.data.coursePublish
      })
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>

<style scoped>
.publish{
  background:#5f5f5f;
  padding: 20px;
  border:1px solid #DDD;
  margin-bottom: 40px;
    /*margin: 20px auto;*/

}
.publish img{
  width: 500px;
  height: 270px;
  /*这里*/
  display: block;
  float:left
}
</style>
