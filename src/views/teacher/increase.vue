<template>
<div>
  添加讲师
  <el-form ref="form"  label-width="80px">
    <el-form-item label="讲师姓名">
      <el-input v-model="teacher.name"></el-input>
    </el-form-item>
    <el-form-item label="讲师级别">
      <el-select v-model="teacher.level" placeholder="请选择讲师级别">
        <el-option label="高级讲师" :value="1"></el-option>
        <el-option label="普通讲师" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="讲师排名">
      <el-input-number v-model="teacher.sort" controls-position="right"  :min="0"></el-input-number>

    </el-form-item>
     <el-form-item label="讲师生涯">
      <el-input v-model="teacher.career"></el-input>
    </el-form-item>


    <el-form-item label="讲师介绍">
      <el-input type="textarea" v-model="teacher.intro"></el-input>
    </el-form-item>
    <el-form-item label="添加时间">
      <el-date-picker
        v-model="teacher.gmtCreate"
        type="datetime"
        placeholder="选择创建时间">
      </el-date-picker>
    </el-form-item>

<!--    上传头像-->
    <el-form-item label="讲师头像">

      <!-- 头衔缩略图 -->
      <pan-thumb :image="teacher.avatar"/>
      <!-- 文件上传按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
      </el-button>

      <!--
  v-show：是否显示上传组件
  :key：类似于id，如果一个页面多个图片上传控件，可以做区分
  :url：后台上传的url地址
  @close：关闭上传组件
  @crop-upload-success：上传成功后的回调
    <input type="file" name="file"/>
  -->
      <image-cropper
        v-show="imagecropperShow"


        :width="300"
        :height="300"
        :key="imagecropperKey"
        :url="BASE_API+'/ossservice/upload/avatar'"
        field="file"
        @close="close"
        @crop-upload-success="cropSuccess"/>
    </el-form-item>

<!--    讲师头像结束-->
    <el-form-item>
      <el-button type="primary" :disabled="saveButtonTeacher" @click="addOrUpdate">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import teacher from '../../api/teacher/teacher'
import PanThumb from '../../components/PanThumb'
import ImageCropper from '../../components/ImageCropper'
export default {
  name: 'increase',
  components:{
    PanThumb,
    ImageCropper
  },
  data(){
    return {
      teacher:{
        name:'',
        level:1,
        intro:'',
        gmtCreate:'',
        career:'',
        sort:0,
        avatar:''
      },
      imagecropperShow:false,
      imagecropperKey:0,
      BASE_API:process.env.BASE_API,
      saveButtonTeacher:false
    }
  },
  created() {
    this.init()
  },
  watch:{
    $route(to,from){
      this.init();
    }
  },
  methods:{
    close(){
      this.imagecropperShow = false
    },
    cropSuccess(data){
      this.teacher.avatar= data.url;
      this.imagecropperShow = false
    },
    init(){
      if(this.$route.params&&this.$route.params.id){
        this.getTeacher(this.$route.params.id)
      }else{
        this.teacher = {}
      }
    },
    addOrUpdate(){
      if(this.teacher.id){
        this.updateTeacher()
      }else{
        this.saveTeacher()
      }
    },
    updateTeacher(){
      teacher.updateTeacher(this.teacher).then(response => {
        this.$message({
          showClose: true,
          message: '恭喜你，更新成功',
          type: 'success'
        });
        this.$router.push({path:"/teacher/table"})
      })
    },
    getTeacher(id){
      teacher.getTeacher(id).then(response => {
        console.log(response)
        this.teacher = response.data.teacher;
      })
    },
    saveTeacher(){
      teacher.increaseTeacher(this.teacher)
              .then(response => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，保存成功',
                  type: 'success'
                });
              })
      this.$router.push({path:"/teacher/table"});
          }
        }
      }
</script>

<style scoped>

</style>
