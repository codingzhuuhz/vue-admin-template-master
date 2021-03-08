<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
<ul class="chapterList">
  <li v-for="chapter in allChapterVideo" :key="chapter.id">
    {{chapter.title}}
    <span class="acts">
                    <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                </span>
    <ul class="videoList">
      <li v-for="video in chapter.littleChapters" :key="video.id">
        {{video.title}}
        <span>
          <el-button style="" type="text" @click="openEditVideo(video.id)">编辑</el-button>
          <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
        </span>
      </li>
    </ul>
  </li>
</ul>



<!---------------------------------章节操作------------------------------------------>
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item  label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="chapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排名" :label-width="formLabelWidth">
          <el-input-number :min="0" v-model="chapter.sort" controls-position="right" placeholder="章节排序"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
<!-------------------------------小节操作---------------------------------------->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="0">免费</el-radio>
            <el-radio :label="1">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
          <el-upload
            class="upload-demo"

            :on-success="handleVideoUploadSuccess"
            :action="BASE_API+'odvservice/upload/uploadVideo'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">小节视频文件上传操作</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>


    <el-button type="text" @click="addChapter">添加章节</el-button>
<!--    这里不能使用this.push-->
    <router-link :to="'/course/increase/'+courseId">
      <el-button style="margin-top: 12px;">上一步</el-button>
    </router-link>

    <el-button style="margin-top: 12px;" @click="afterPublish">保存,并下一步</el-button>
  </div>
</template>

<script>
  import outline from '../../api/outline/outline'
  import chapter from '../../api/chapter/chapter'
  import video from '../../api/chapter/video'
export default {
  name: 'outline',
  data() {
    return {
      BASE_API:process.env.BASE_API,
      saveVideoBtnDisabled:false,
      formLabelWidth: '120px',
      dialogFormVisible:false,
      dialogVideoFormVisible:false,
      chapterId:null,
      courseId:'',
      active: 1,
      allChapterVideo:[],
      chapter:{
         title:'',
         sort:''
      },
      video:{
        title:'',
        videoSourceId:'',
        videoOriginalName:''
      },
      file:{},//是每一个小的上传的文件  为了在下边进行显示  把他给push到fileList中
      fileList:[]
    };
  },
created(){
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      // chapter中的数据



      this.getAllChapterVideo(this.courseId)
    }
},
  methods: {
    uploadVideo(){
      this.$refs.upload.submit();
    },
    handleVideoUploadSuccess(res,file,fileList){
      // 上传成功之后获取videoId 和文件的name
      this.video.videoSourceId = res.data.videoSourceId
      this.video.videoOriginalName = file.name

    },
    //
      handleRemove(file, fileList) {
        video.deleteUploadVideo(this.video.videoSourceId).then(response => {
          this.$message({
            showClose: true,
            message: '视频删除成功',
            type: 'success'
          });
          //这个地方为啥不能是null
          this.video.videoSourceId = ''
          this.video.videoOriginalName = ''
          this.fileList = []
        })
        console.log(file, fileList);
    },
      handlePreview(file) {
      console.log(file);
    },

      handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
      //移除之前的提示提示框
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
      afterPublish(){
        this.$router.push({path:'/course/publish/'+this.courseId})
      },
    // ---------------------小节操作--------------------------
    openVideo(chapterId){
      this.chapterId = chapterId
      this.dialogVideoFormVisible = true
      this.video = {}
    },
    openEditVideo(id){
      this.dialogVideoFormVisible = true
      video.getVideo(id).then(response => {
        this.video = response.data.eduVideo
        this.file.name = this.video.videoOriginalName
        /////////预留视频的url的显示
        this.fileList.push(this.file)
        console.log(this.video)
      })
    },
    saveOrUpdateVideo(){
      if(this.video.id == null){
        this.saveVideo()
        // this.fileList=[]//将视频列表清空
      }else{
        this.updateVideo()
      }
    },
    saveVideo(){
      this.video.courseId = this.courseId
      this.video.chapterId = this.chapterId
      video.saveVideo(this.video).then(response => {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        });
        this.dialogVideoFormVisible = false

        this.getAllChapterVideo(this.courseId)
      })
    },
    updateVideo(){
       video.updateVideo(this.video).then(response =>{
         this.$message({
           showClose: true,
           message: '更新成功',
           type: 'success'
         });
         this.dialogVideoFormVisible = false

         this.getAllChapterVideo(this.courseId)
       })
    },
    deleteVideo(id){
      this.$confirm('此操作将删除小节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          video.deleteVideo(id).then(response => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.getAllChapterVideo(this.courseId)
          })
       }
      )
    },
    // ---------------------章节操作--------------------------
    // 清空表单中的数据，打开模态框
    addChapter(){
      this.chapter = {}
      this.dialogFormVisible = true
    },
    saveOrUpdate(){
      if(this.chapter.id == null){
        this.saveChapter();
      }else{
        this.updateChapter();
      }
    },
    saveChapter(){
      this.chapter.courseId = this.courseId
      chapter.saveChapter(this.chapter).then(response => {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        });
        this.dialogFormVisible = false

        this.getAllChapterVideo(this.courseId)
      })
    },
    updateChapter(){
      chapter.updateChapter(this.chapter).then(response => {
        this.$message({
          showClose: true,
          message: '更新成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.getAllChapterVideo(this.courseId)
      })
    },

    removeChapter(id){
      this.$confirm('此操作将删除章节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapter.deleteChapter(id).then(response => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this.getAllChapterVideo(this.courseId)
        })
      })

    },
    openEditChatper(id){
      this.dialogFormVisible = true
      chapter.getChapter(id).then(response =>{
          this.chapter = response.data.chapter
      })
    },
    // -------------------结束-----------------------
    // returnBefore(){
    //   this.$router.push({path:'/course/increase'+this.courseId})
    // },
    getAllChapterVideo(couseId){
      outline.getAllChapterVideo(couseId).then(response => {
        this.allChapterVideo = response.data.list
      })
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>

<style scoped>
  .chapterList p{
    font-size: 18px;
  }
.videoList{
  padding-left:50px;
}
  .videoList p{
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    line-height: 30px;
    width: 100%;
    border:1px dotted #ddd;
  }
</style>
