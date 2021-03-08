import request from '@/utils/request'
export default {
  getAllChapterVideo(courseId){
    return  request({
      url:'/eduservice/chapter/getChapterLittleChapter/'+courseId,
      method:"get"
    })
  }
}
