<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类" @change="subjectLevelOneChanged">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"/>

        </el-select>

         二级分类
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"/>
        </el-select>
      </el-form-item>


      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">

          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>

        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
<!--        文本编辑器中的图片在数据库中是以base64的方式进行存储的-->
        <tinymce :height="300" v-model="courseInfo.description"/>
<!--        <el-input v-model="courseInfo.description" placeholder=" "/>-->
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">

        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'ossservice/upload/avatar'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>

      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>

<!--    <router-link :to="'/course/outline'">-->
<!--      <el-button style="margin-top: 12px;">保存,并下一步</el-button>-->
<!--    </router-link>-->




  </div>
</template>

<script>
import course from '../../api/course/course'
import subject from '../../api/subject/subject'
import teacher from '../../api/teacher/teacher'
import Tinymce from '../../components/Tinymce'
export default {
  name: "increase",
  components:{
    Tinymce
  },
  data() {
    return {
      BASE_API:process.env.BASE_API,

      active: 0,
      saveBtnDisabled:false,
      subjectOneList:null,
      subjectTwoList:null,
      teacherList:null,
      courseId:null,
      courseInfo:{
        description:'',
        price:'',
        title:'',
        subjectParentId:'',
        subjectId:'',
        teacherId:'',
        lessonNum:'',
        cover:'/static/f510429b78c7cbe1d427ced9fbd8d66a.jpg',
      }
    };
  },
  created() {
    this.getOneSubject()
    this.getAllTeacher()
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      console.log(this.courseId)
      this.getCourseInfo()
      // this.getTwoCategary()
      // this.subjectLevelOneChanged(this.subjectParentId)
    }

  },
  methods: {
    getCourseInfo(){
      course.getCourseInfo(this.courseId).then(response => {
        // this.getOneSubject()
        this.courseInfo = response.data.courseInfo
        subject.getAllSubject().then(response => {
          this.subjectOneList = response.data.list
          for(var i=0; this.subjectOneList.length; i++ ){
            if(this.courseInfo.subjectParentId == this.subjectOneList[i].id){
              this.subjectTwoList = this.subjectOneList[i].children;
            }
          }
        })
        // this.getAllTeacher()
      })
    },
    handleAvatarSuccess(res,file){
        this.courseInfo.cover = res.data.url
        this.$message({
          showClose: true,
          message: '封面上传成功',
          type: 'success'
        });
    },
    beforeAvatarUpload(file){
      const fileType = file.type == 'image/jpg'
      const fileSize = file.size/1024/1024 < 2
      if(!fileSize){
        this.$message({
          showClose: true,
          message: '文件过大',
          type: 'success'
        });
      }
      if(fileType){
        this.$message({
          showClose: true,
          message: '文件类型不正确',
          type: 'success'
        });
      }
    },
    getAllTeacher(){
      teacher.getAllTeacher().then(reponse => {
        this.teacherList = reponse.data.items
      })
    },
    subjectLevelOneChanged(value){//这里直接把多点的一级标题的id传过来了
      for (var i=0 ;i<this.subjectOneList.length;i++){
          if(value == this.subjectOneList[i].id){

              this.subjectTwoList = this.subjectOneList[i].children;
              this.courseInfo.subjectId = ''
          }
      }
    },
    // getTwoCategary() {
    //   console.log(this.subjectOneList)
    //   for (var i = 0; i < this.subjectOneList.length; i++) {
    //     if (this.subjectParentId == this.subjectOneList[i].id) {
    //
    //       this.subjectTwoList = this.subjectOneList[i].children;
    //       console.log(this.subjectTwoList)
    //       // this.courseInfo.subjectId = ''
    //     }
    //   }
    // },
    getOneSubject(){
      subject.getAllSubject().then(reponse => {
        this.subjectOneList = reponse.data.list
      })
    },
    saveOrUpdate(){
      if(this.courseInfo.id!=null){
        course.updateCourseInfo(this.courseInfo)
          .then(response => {
            // this.courseId = response.data.courseId
            this.$message({
              showClose: true,
              message: '恭喜你，更新成功',
              type: 'success'
            });
            this.$router.push({path:'/course/outline/'+this.courseId})
          })
      }else{
        course.addCourseInfo(this.courseInfo)
          .then(response => {
            this.courseId = response.data.courseId
            this.$message({
              showClose: true,
              message: '恭喜你，保存成功',
              type: 'success'
            });
            this.$router.push({path:'/course/outline/'+this.courseId})
          })
      }

    },
    next() {
      if (this.active++ > 2)
        this.active = 0;
    }
  }
}
</script>

<style scoped>

</style>
