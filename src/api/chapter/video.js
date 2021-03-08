import request from '@/utils/request'
import vi from 'element-ui/src/locale/lang/vi'
export default {
  saveVideo(video){
    return request({
      url:'/eduservice/chapter/addVideo',
      method:'post',
      data:video
    })
  },
  getVideo(id){
    return request({
      url:'/eduservice/chapter/getVideo/'+id,
      method:'get'
    })
  },
  deleteVideo(id){
    return request({
      url:'/eduservice/chapter/deleteVideo/'+id,
      method:'delete'
    })
  },
  updateVideo(video){
    return request({
      url:'/eduservice/chapter/updateVideo',
      method:'post',
      data:video
    })
  },
  deleteUploadVideo(videoId){
    return request({
      url:'/odvservice/upload/deleteVideo/'+videoId,
      method:'delete'
    })
  }
}
