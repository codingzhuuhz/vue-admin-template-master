<template>
<div class="">
讲师列表
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="teacherQuery.name" placeholder="讲师人名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="teacherQuery.level" placeholder="级别">
        <el-option label="高级讲师" :value="1"></el-option>
        <el-option label="普通讲师" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-date-picker
      v-model="teacherQuery.gmtCreate1"
      type="datetime"
      placeholder="选择开始时间">
    </el-date-picker>
    <el-date-picker
      v-model="teacherQuery.gmtCreate2"
      type="datetime"
      placeholder="选择截止时间">
    </el-date-picker>

    <el-form-item>
      <el-button type="primary" @click="getAllTeacher">查询</el-button>
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
      prop="name"
      label="姓名"
      width="100">
    </el-table-column>

      <el-table-column
        label="级别"
        width="100">
        <template slot-scope="scope">
          {{scope.row.level===1?"高级讲师":"普通讲师"}}
        </template>
      </el-table-column>

    <el-table-column
      prop="intro"
      label="介绍"
      width="300">
    </el-table-column>
    <el-table-column
      prop="career"
      label="生涯"
      width="150">
    </el-table-column>
    <el-table-column prop="gmtCreate" label="添加时间" width="250"/>

    <el-table-column prop="sort" label="排序" width="80" />
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <router-link :to="'/teacher/edit/'+scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
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
    @current-change="getAllTeacher"
  />
</div>
</template>
<script>
import teacher from '@/api/teacher/teacher'
export default {
  name: "index",
  data(){
    return {
      current:1,
      pageCount:10,
      total:0,
      list:null,
      teacherQuery:{}
    }
  },
  created() {
    this.getAllTeacher();
  },
  methods:{
    getAllTeacher(current=1){
      this.current = current;
      teacher.getTeacherList(this.current,this.pageCount,this.teacherQuery)
        .then(response => {
          this.list = response.data.list
          this.total = response.data.total

          console.log(response);
        })
        .catch(error =>{
            console.log(error)
          }
        );
    },
    removeDataById(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.removeTeacherById(id).then(response => {console.log(response)}).catch();
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAllTeacher()
      }).catch(() => {

      });
    },
    resetData(){
      this.teacherQuery = {}
      this.getAllTeacher()
    }
  }

}
</script>

<style scoped>

</style>
