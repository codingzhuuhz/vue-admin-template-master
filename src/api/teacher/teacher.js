import request from '@/utils/request'

export default {
  getTeacherList(current, pageCount, teacherQuery){
    return request({
      url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+pageCount ,
      method: 'get',
      //使用data 将数据转化为json
      data: teacherQuery
    })
  },
  getAllTeacher(){
    return request({
      url:'/eduservice/teacher/findAllTeacher',
      method:'get'
    })
  },
  removeTeacherById(id){
    return request({
      url:'/eduservice/teacher/deleteTeacher/'+id,
      method: 'delete'
    })
  },
  updateTeacher(teacher) {
    return request({
      url:'/eduservice/teacher/updateTeacher',
      method:'post',
      data:teacher
    })
  },
  getTeacher(id){
    return request({
      url:'/eduservice/teacher/findTeacherById/'+id,
      method:'get'
    })
  },
  increaseTeacher(teacher){
    return request({
      url:'/eduservice/teacher/increaseTeacher',
      method:'post',
      data:teacher
    })
  }
}





