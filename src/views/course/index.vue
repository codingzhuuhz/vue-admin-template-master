<template>
<div>
  课程列表
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="courseQuery.title" placeholder="课程名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="courseQuery.status" placeholder="状态">
        <el-option label="免费" :value="Draft"></el-option>
        <el-option label="收费" :value="Normal"></el-option>
      </el-select>
    </el-form-item>
    <el-date-picker
      v-model="courseQuery.gmtCreate1"
      type="datetime"
      placeholder="选择开始时间">
    </el-date-picker>
    <el-date-picker
      v-model="courseQuery.gmtCreate2"
      type="datetime"
      placeholder="选择截止时间">
    </el-date-picker>

    <el-form-item>
      <el-button type="primary" @click="getAllCourse">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form-item>
  </el-form>


  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="300">
    </el-table-column>

    <el-table-column
      label="状态"
      width="100">
      <template slot-scope="scope">
        {{scope.row.status==='Normal'?"已发布":"未发布"}}
      </template>
    </el-table-column>

    <el-table-column
      prop="price"
      label="价格"
      width="100">
    </el-table-column>
    <el-table-column
      prop="lessonNum"
      label="课时"
      width="150">
    </el-table-column>
    <el-table-column prop="gmtCreate" label="添加时间" width="250"/>

    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <router-link :to="'/course/increase/'+scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">修改课程基本信息</el-button>
        </router-link>
        <router-link :to="'/course/outline/'+scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">修改大纲信息</el-button>
        </router-link>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <!--element-ui进行分页-->
  <!-- 分页 -->
  <el-pagination
    :current-page="current"
    :page-size="pageCount"
    :total="total"
    style="padding: 30px 0; text-align: center;"
    layout="total, prev, pager, next, jumper"
    @current-change="getAllCourse"
  />
</div>
</template>

<script>
import course from '../../api/course/course'
export default {
  name: "index",
  data(){
    return{
      current:1,
      pageCount:10,
      total:'',
      list:[],
      courseQuery:{}
    }
  },
  created() {
    this.getAllCourse(this.current)
  },
  methods:{
    getAllCourse(current=1){
      course.getAllCourse(current,this.pageCount).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    resetData(){
      this.courseQuery = {}
    },
    removeDataById(id){
      this.$confirm('此操作将删除此课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteCourse(id).then(response =>{
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this.getAllCourse(this.current)
          // this.$router.push({path:'/course/list'})
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
