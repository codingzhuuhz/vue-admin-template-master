import request from '@/utils/request'
export default {
  saveChapter(chapter){
    return request({
      url:'/eduservice/chapter/addChapter',
      method:'post',
      data:chapter
    })
  },
  getChapter(id){
    return request({
      url:'/eduservice/chapter/getChapter/'+id,
      method:'get'
    })
  },
  deleteChapter(id){
    return request({
      url:'/eduservice/chapter/deleteChapter/'+id,
      method:'delete'
    })
  },
  updateChapter(chapter){
    return request({
      url:'/eduservice/chapter/updateChapter',
      method:'post',
      data:chapter
    })
  }
}
