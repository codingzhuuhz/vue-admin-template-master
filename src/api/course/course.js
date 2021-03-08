import request from '@/utils/request'
export default {
  addCourseInfo(courseInfo){
    return  request({
        url: '/eduservice/course/addCourseInfo',
        method: "post",
        data:courseInfo
    })
  },
  getCourseInfo(id){
    return  request({
      url: '/eduservice/course/getCourseInfoById/'+id,
      method: "get",

    })
  },
  updateCourseInfo(courseInfo){
    return  request({
      url: '/eduservice/course/updateCourseInfo',
      method: "post",
      data:courseInfo
    })
  },
  getCoursePublish(courseId){
    return request({
      url:'/eduservice/course/getCoursePublish/'+courseId,
      method:'get'
    })
  },
  publishCourse(courseId){
    return request({
      url:'/eduservice/course/publishCourse/'+courseId,
      method:'post'
    })
  },
  getAllCourse(current,pageCount) {
    return request({
      url:'/eduservice/course/pageCourse/'+current+"/"+pageCount,
      method:'get'
    })
  },
  deleteCourse(id) {
    return request({
      url:'/eduservice/course/deleteCourse/'+id,
      method:'delete'
    })
  }
}
