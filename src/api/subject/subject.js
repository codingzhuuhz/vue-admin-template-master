import request from '@/utils/request'
export default {
  getAllSubject(){
    return  request({
      url:'/eduservice/edusubject/findAllSubject',
      method:"get"
    })
  }
}
