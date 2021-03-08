<template>
<div>
  课程添加
<!--  <el-upload-->
<!--    class="upload-demo"-->
<!--    drag-->
<!--    :action="BASE_API/eduservice/edusubject"-->
<!--    accept="application/vnd.ms-excel"-->
<!--    multiple>-->
<!--    <i class="el-icon-upload"></i>-->
<!--    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--    <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过500kb</div>-->
<!--  </el-upload>-->

  <el-upload
    class="upload-demo"
    ref="upload"
    :action="BASE_API+'/eduservice/edusubject'"
    :on-success="fileUploadSuccess"
    :on-error="fileUploadError"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :auto-upload="false"
    accept="application/vnd.ms-excel">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传execel文件，且不超过500kb</div>
  </el-upload>
</div>
</template>

<script>
export default {
  name: 'increase',
  data(){
    return {
      BASE_API:process.env.BASE_API,
    }
  },
  methods:{
    submitUpload(){
      this.$refs.upload.submit();
    },
    fileUploadSuccess(){
      this.$message({
        showClose: true,
        message: '恭喜你，保存成功',
        type: 'success'
      });
    },
    fileUploadError(){
      this.$message({
        showClose: true,
        message: '文件上传失败',
        type: 'failure'
      });
    },
    handlePreview(){

    },
    handleRemove(){

    }
  }
}
</script>

<style scoped>

</style>
