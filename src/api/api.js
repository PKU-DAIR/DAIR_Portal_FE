/* eslint-disable */
// More information: https://github.com/minskiter/openapijs
import axios from './config.js'
import * as Axios from 'axios'
import * as UserModel from './model.js'

// fix vite error.
const CancelTokenSource = Axios.CancelTokenSource;


export class User {
 
  /**
  * @summary Apply for a user account
  * @param {UserModel.User} [user] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ApplyUser(user,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/apply_user',
        data:user,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Login
  * @param {UserModel.User} [user] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async Login(user,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/login',
        data:user,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get user info
  * @param {undefined} [valid_info] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetUserInfo(valid_info,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/info_me',
        data:{},
        params:{valid_info},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Update user info
  * @param {undefined} [valid_info] 
  * @param {UserModel.UserInfo} [userinfo] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UpdateUserInfo(valid_info,userinfo,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/update_me',
        data:userinfo,
        params:{valid_info},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Update user password
  * @param {undefined} [valid_info] 
  * @param {UserModel.UserSecurityInfo} [usersecurityinfo] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UpdateUserPassword(valid_info,usersecurityinfo,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/update_pwd',
        data:usersecurityinfo,
        params:{valid_info},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get all users (Admin)
  * @param {undefined} [valid_info] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetAllUsers(valid_info,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/user/get_users',
        data:{},
        params:{valid_info},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List users (Admin)
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListUsers(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/list_users',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get total user count (Admin)
  * @param {undefined} [search] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetTotalUserCount(search,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/list_users_size',
        data:{},
        params:{search},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Upload user avatar
  * @param {undefined} [valid_info] 
  * @param {UserModel.Body_UploadAvatar} [body_uploadavatar] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UploadAvatar(valid_info,body_uploadavatar,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/upload_avatar',
        data:body_uploadavatar,
        params:{valid_info},
        headers:{
          "Content-Type":"multipart/form-data"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get user avatar
  * @param {undefined} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetUserAvatar(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/user/avatar',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get my avatar
  * @param {undefined} [valid_info] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetMyAvatar(valid_info,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/me/avatar',
        data:{},
        params:{valid_info},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get all user roles (Admin)
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetAllUserRoles(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/user/get_users_roles',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add user role (Admin)
  * @param {UserModel.UserInfo} [userinfo] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddUserRole(userinfo,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add/role',
        data:userinfo,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove user role (Admin)
  * @param {UserModel.UserInfo} [userinfo] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveUserRole(userinfo,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/del/role',
        data:userinfo,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class User static method properties bind
/**
* @description ApplyUser url链接，包含baseURL
*/
User.ApplyUser.fullPath=`${axios.defaults.baseURL}/apply_user`
/**
* @description ApplyUser url链接，不包含baseURL
*/
User.ApplyUser.path=`/apply_user`
/**
* @description Login url链接，包含baseURL
*/
User.Login.fullPath=`${axios.defaults.baseURL}/login`
/**
* @description Login url链接，不包含baseURL
*/
User.Login.path=`/login`
/**
* @description GetUserInfo url链接，包含baseURL
*/
User.GetUserInfo.fullPath=`${axios.defaults.baseURL}/info_me`
/**
* @description GetUserInfo url链接，不包含baseURL
*/
User.GetUserInfo.path=`/info_me`
/**
* @description UpdateUserInfo url链接，包含baseURL
*/
User.UpdateUserInfo.fullPath=`${axios.defaults.baseURL}/update_me`
/**
* @description UpdateUserInfo url链接，不包含baseURL
*/
User.UpdateUserInfo.path=`/update_me`
/**
* @description UpdateUserPassword url链接，包含baseURL
*/
User.UpdateUserPassword.fullPath=`${axios.defaults.baseURL}/update_pwd`
/**
* @description UpdateUserPassword url链接，不包含baseURL
*/
User.UpdateUserPassword.path=`/update_pwd`
/**
* @description GetAllUsers url链接，包含baseURL
*/
User.GetAllUsers.fullPath=`${axios.defaults.baseURL}/user/get_users`
/**
* @description GetAllUsers url链接，不包含baseURL
*/
User.GetAllUsers.path=`/user/get_users`
/**
* @description ListUsers url链接，包含baseURL
*/
User.ListUsers.fullPath=`${axios.defaults.baseURL}/list_users`
/**
* @description ListUsers url链接，不包含baseURL
*/
User.ListUsers.path=`/list_users`
/**
* @description GetTotalUserCount url链接，包含baseURL
*/
User.GetTotalUserCount.fullPath=`${axios.defaults.baseURL}/list_users_size`
/**
* @description GetTotalUserCount url链接，不包含baseURL
*/
User.GetTotalUserCount.path=`/list_users_size`
/**
* @description UploadAvatar url链接，包含baseURL
*/
User.UploadAvatar.fullPath=`${axios.defaults.baseURL}/upload_avatar`
/**
* @description UploadAvatar url链接，不包含baseURL
*/
User.UploadAvatar.path=`/upload_avatar`
/**
* @description GetUserAvatar url链接，包含baseURL
*/
User.GetUserAvatar.fullPath=`${axios.defaults.baseURL}/user/avatar`
/**
* @description GetUserAvatar url链接，不包含baseURL
*/
User.GetUserAvatar.path=`/user/avatar`
/**
* @description GetMyAvatar url链接，包含baseURL
*/
User.GetMyAvatar.fullPath=`${axios.defaults.baseURL}/me/avatar`
/**
* @description GetMyAvatar url链接，不包含baseURL
*/
User.GetMyAvatar.path=`/me/avatar`
/**
* @description GetAllUserRoles url链接，包含baseURL
*/
User.GetAllUserRoles.fullPath=`${axios.defaults.baseURL}/user/get_users_roles`
/**
* @description GetAllUserRoles url链接，不包含baseURL
*/
User.GetAllUserRoles.path=`/user/get_users_roles`
/**
* @description AddUserRole url链接，包含baseURL
*/
User.AddUserRole.fullPath=`${axios.defaults.baseURL}/add/role`
/**
* @description AddUserRole url链接，不包含baseURL
*/
User.AddUserRole.path=`/add/role`
/**
* @description RemoveUserRole url链接，包含baseURL
*/
User.RemoveUserRole.fullPath=`${axios.defaults.baseURL}/del/role`
/**
* @description RemoveUserRole url链接，不包含baseURL
*/
User.RemoveUserRole.path=`/del/role`

export class Major {
 
  /**
  * @summary Get Majors
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetMajors(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_majors',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Major
  * @param {UserModel.Major} [major] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddMajor(major,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_major',
        data:major,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Major
  * @param {UserModel.Major} [major] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveMajor(major,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_major',
        data:major,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Major static method properties bind
/**
* @description GetMajors url链接，包含baseURL
*/
Major.GetMajors.fullPath=`${axios.defaults.baseURL}/get_majors`
/**
* @description GetMajors url链接，不包含baseURL
*/
Major.GetMajors.path=`/get_majors`
/**
* @description AddMajor url链接，包含baseURL
*/
Major.AddMajor.fullPath=`${axios.defaults.baseURL}/add_major`
/**
* @description AddMajor url链接，不包含baseURL
*/
Major.AddMajor.path=`/add_major`
/**
* @description RemoveMajor url链接，包含baseURL
*/
Major.RemoveMajor.fullPath=`${axios.defaults.baseURL}/remove_major`
/**
* @description RemoveMajor url链接，不包含baseURL
*/
Major.RemoveMajor.path=`/remove_major`

export class Group {
 
  /**
  * @summary Get Groups
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetGroups(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_groups',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Group
  * @param {UserModel.Group} [group] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddGroup(group,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_group',
        data:group,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Group
  * @param {UserModel.Group} [group] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveGroup(group,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_group',
        data:group,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Group static method properties bind
/**
* @description GetGroups url链接，包含baseURL
*/
Group.GetGroups.fullPath=`${axios.defaults.baseURL}/get_groups`
/**
* @description GetGroups url链接，不包含baseURL
*/
Group.GetGroups.path=`/get_groups`
/**
* @description AddGroup url链接，包含baseURL
*/
Group.AddGroup.fullPath=`${axios.defaults.baseURL}/add_group`
/**
* @description AddGroup url链接，不包含baseURL
*/
Group.AddGroup.path=`/add_group`
/**
* @description RemoveGroup url链接，包含baseURL
*/
Group.RemoveGroup.fullPath=`${axios.defaults.baseURL}/remove_group`
/**
* @description RemoveGroup url链接，不包含baseURL
*/
Group.RemoveGroup.path=`/remove_group`

export class Edu {
 
  /**
  * @summary Get Edus
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetEdus(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_edus',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Edu
  * @param {UserModel.Edu} [edu] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddEdu(edu,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_edu',
        data:edu,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Edu
  * @param {UserModel.Edu} [edu] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveEdu(edu,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_edu',
        data:edu,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Edu static method properties bind
/**
* @description GetEdus url链接，包含baseURL
*/
Edu.GetEdus.fullPath=`${axios.defaults.baseURL}/get_edus`
/**
* @description GetEdus url链接，不包含baseURL
*/
Edu.GetEdus.path=`/get_edus`
/**
* @description AddEdu url链接，包含baseURL
*/
Edu.AddEdu.fullPath=`${axios.defaults.baseURL}/add_edu`
/**
* @description AddEdu url链接，不包含baseURL
*/
Edu.AddEdu.path=`/add_edu`
/**
* @description RemoveEdu url链接，包含baseURL
*/
Edu.RemoveEdu.fullPath=`${axios.defaults.baseURL}/remove_edu`
/**
* @description RemoveEdu url链接，不包含baseURL
*/
Edu.RemoveEdu.path=`/remove_edu`

export class Team {
 
  /**
  * @summary Get Teams
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetTeams(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_teams',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Team
  * @param {UserModel.Team} [team] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddTeam(team,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_team',
        data:team,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Team
  * @param {UserModel.Team} [team] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveTeam(team,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_team',
        data:team,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Client Teams
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetClientTeams(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_client_teams',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Client Team
  * @param {UserModel.ClientTeam} [clientteam] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddClientTeam(clientteam,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_client_team',
        data:clientteam,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Client Team
  * @param {UserModel.Team} [team] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveClientTeam(team,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_client_team',
        data:team,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Update Client Team Group
  * @param {UserModel.ClientTeam} [clientteam] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UpdateClientTeamGroup(clientteam,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_client_team/group',
        data:clientteam,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Team static method properties bind
/**
* @description GetTeams url链接，包含baseURL
*/
Team.GetTeams.fullPath=`${axios.defaults.baseURL}/get_teams`
/**
* @description GetTeams url链接，不包含baseURL
*/
Team.GetTeams.path=`/get_teams`
/**
* @description AddTeam url链接，包含baseURL
*/
Team.AddTeam.fullPath=`${axios.defaults.baseURL}/add_team`
/**
* @description AddTeam url链接，不包含baseURL
*/
Team.AddTeam.path=`/add_team`
/**
* @description RemoveTeam url链接，包含baseURL
*/
Team.RemoveTeam.fullPath=`${axios.defaults.baseURL}/remove_team`
/**
* @description RemoveTeam url链接，不包含baseURL
*/
Team.RemoveTeam.path=`/remove_team`
/**
* @description GetClientTeams url链接，包含baseURL
*/
Team.GetClientTeams.fullPath=`${axios.defaults.baseURL}/get_client_teams`
/**
* @description GetClientTeams url链接，不包含baseURL
*/
Team.GetClientTeams.path=`/get_client_teams`
/**
* @description AddClientTeam url链接，包含baseURL
*/
Team.AddClientTeam.fullPath=`${axios.defaults.baseURL}/add_client_team`
/**
* @description AddClientTeam url链接，不包含baseURL
*/
Team.AddClientTeam.path=`/add_client_team`
/**
* @description RemoveClientTeam url链接，包含baseURL
*/
Team.RemoveClientTeam.fullPath=`${axios.defaults.baseURL}/remove_client_team`
/**
* @description RemoveClientTeam url链接，不包含baseURL
*/
Team.RemoveClientTeam.path=`/remove_client_team`
/**
* @description UpdateClientTeamGroup url链接，包含baseURL
*/
Team.UpdateClientTeamGroup.fullPath=`${axios.defaults.baseURL}/add_client_team/group`
/**
* @description UpdateClientTeamGroup url链接，不包含baseURL
*/
Team.UpdateClientTeamGroup.path=`/add_client_team/group`

export class ToWhere {
 
  /**
  * @summary Get Towheres
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetToWheres(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_towheres',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Towhere
  * @param {UserModel.ToWhere} [towhere] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddToWhere(towhere,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_towhere',
        data:towhere,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Towhere
  * @param {UserModel.ToWhere} [towhere] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveToWhere(towhere,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_towhere',
        data:towhere,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class ToWhere static method properties bind
/**
* @description GetToWheres url链接，包含baseURL
*/
ToWhere.GetToWheres.fullPath=`${axios.defaults.baseURL}/get_towheres`
/**
* @description GetToWheres url链接，不包含baseURL
*/
ToWhere.GetToWheres.path=`/get_towheres`
/**
* @description AddToWhere url链接，包含baseURL
*/
ToWhere.AddToWhere.fullPath=`${axios.defaults.baseURL}/add_towhere`
/**
* @description AddToWhere url链接，不包含baseURL
*/
ToWhere.AddToWhere.path=`/add_towhere`
/**
* @description RemoveToWhere url链接，包含baseURL
*/
ToWhere.RemoveToWhere.fullPath=`${axios.defaults.baseURL}/remove_towhere`
/**
* @description RemoveToWhere url链接，不包含baseURL
*/
ToWhere.RemoveToWhere.path=`/remove_towhere`

export class Award {
 
  /**
  * @summary Get Award Levels
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetAwardLevels(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_award_levels',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Award Level
  * @param {UserModel.AwardLevel} [awardlevel] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddAwardLevel(awardlevel,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_award_level',
        data:awardlevel,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Award Level
  * @param {UserModel.AwardLevel} [awardlevel] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveAwardLevel(awardlevel,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_award_level',
        data:awardlevel,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Award Items
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetAwardItems(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_award_items',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Award Item
  * @param {UserModel.AwardItem} [awarditem] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddAwardItem(awarditem,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_award_item',
        data:awarditem,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Remove Award Item
  * @param {UserModel.AwardItem} [awarditem] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async RemoveAwardItem(awarditem,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/remove_award_item',
        data:awarditem,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Award static method properties bind
/**
* @description GetAwardLevels url链接，包含baseURL
*/
Award.GetAwardLevels.fullPath=`${axios.defaults.baseURL}/get_award_levels`
/**
* @description GetAwardLevels url链接，不包含baseURL
*/
Award.GetAwardLevels.path=`/get_award_levels`
/**
* @description AddAwardLevel url链接，包含baseURL
*/
Award.AddAwardLevel.fullPath=`${axios.defaults.baseURL}/add_award_level`
/**
* @description AddAwardLevel url链接，不包含baseURL
*/
Award.AddAwardLevel.path=`/add_award_level`
/**
* @description RemoveAwardLevel url链接，包含baseURL
*/
Award.RemoveAwardLevel.fullPath=`${axios.defaults.baseURL}/remove_award_level`
/**
* @description RemoveAwardLevel url链接，不包含baseURL
*/
Award.RemoveAwardLevel.path=`/remove_award_level`
/**
* @description GetAwardItems url链接，包含baseURL
*/
Award.GetAwardItems.fullPath=`${axios.defaults.baseURL}/get_award_items`
/**
* @description GetAwardItems url链接，不包含baseURL
*/
Award.GetAwardItems.path=`/get_award_items`
/**
* @description AddAwardItem url链接，包含baseURL
*/
Award.AddAwardItem.fullPath=`${axios.defaults.baseURL}/add_award_item`
/**
* @description AddAwardItem url链接，不包含baseURL
*/
Award.AddAwardItem.path=`/add_award_item`
/**
* @description RemoveAwardItem url链接，包含baseURL
*/
Award.RemoveAwardItem.fullPath=`${axios.defaults.baseURL}/remove_award_item`
/**
* @description RemoveAwardItem url链接，不包含baseURL
*/
Award.RemoveAwardItem.path=`/remove_award_item`

export class Member {
 
  /**
  * @summary List Members Client
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListMembersClient(offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/list_members_client',
        data:{},
        params:{offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List Members
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListMembers(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/list_members',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Member
  * @param {undefined} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetMember(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_member',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Member Client
  * @param {undefined} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetMemberClient(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_member_client',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Myself
  * @param {undefined} [valid_info] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetMyCv(valid_info,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_my_cv',
        data:{},
        params:{valid_info},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Member
  * @param {UserModel.MemberInfo} [memberinfo] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddMember(memberinfo,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/add_member',
        data:memberinfo,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Update Member
  * @param {UserModel.MemberInfo} [memberinfo] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UpdateMember(memberinfo,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/update_member',
        data:memberinfo,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Upload Member Avatar
  * @param {UserModel.Body_UploadMemberAvatar} [body_uploadmemberavatar] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UploadMemberAvatar(body_uploadmemberavatar,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/upload_member_avatar',
        data:body_uploadmemberavatar,
        params:{},
        headers:{
          "Content-Type":"multipart/form-data"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Member Avatar
  * @param {undefined} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetMemberAvatar(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_member_avatar',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Delete Member
  * @param {undefined} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async DeleteMember(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/remove_member',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Member static method properties bind
/**
* @description ListMembersClient url链接，包含baseURL
*/
Member.ListMembersClient.fullPath=`${axios.defaults.baseURL}/list_members_client`
/**
* @description ListMembersClient url链接，不包含baseURL
*/
Member.ListMembersClient.path=`/list_members_client`
/**
* @description ListMembers url链接，包含baseURL
*/
Member.ListMembers.fullPath=`${axios.defaults.baseURL}/list_members`
/**
* @description ListMembers url链接，不包含baseURL
*/
Member.ListMembers.path=`/list_members`
/**
* @description GetMember url链接，包含baseURL
*/
Member.GetMember.fullPath=`${axios.defaults.baseURL}/get_member`
/**
* @description GetMember url链接，不包含baseURL
*/
Member.GetMember.path=`/get_member`
/**
* @description GetMemberClient url链接，包含baseURL
*/
Member.GetMemberClient.fullPath=`${axios.defaults.baseURL}/get_member_client`
/**
* @description GetMemberClient url链接，不包含baseURL
*/
Member.GetMemberClient.path=`/get_member_client`
/**
* @description GetMyCv url链接，包含baseURL
*/
Member.GetMyCv.fullPath=`${axios.defaults.baseURL}/get_my_cv`
/**
* @description GetMyCv url链接，不包含baseURL
*/
Member.GetMyCv.path=`/get_my_cv`
/**
* @description AddMember url链接，包含baseURL
*/
Member.AddMember.fullPath=`${axios.defaults.baseURL}/add_member`
/**
* @description AddMember url链接，不包含baseURL
*/
Member.AddMember.path=`/add_member`
/**
* @description UpdateMember url链接，包含baseURL
*/
Member.UpdateMember.fullPath=`${axios.defaults.baseURL}/update_member`
/**
* @description UpdateMember url链接，不包含baseURL
*/
Member.UpdateMember.path=`/update_member`
/**
* @description UploadMemberAvatar url链接，包含baseURL
*/
Member.UploadMemberAvatar.fullPath=`${axios.defaults.baseURL}/upload_member_avatar`
/**
* @description UploadMemberAvatar url链接，不包含baseURL
*/
Member.UploadMemberAvatar.path=`/upload_member_avatar`
/**
* @description GetMemberAvatar url链接，包含baseURL
*/
Member.GetMemberAvatar.fullPath=`${axios.defaults.baseURL}/get_member_avatar`
/**
* @description GetMemberAvatar url链接，不包含baseURL
*/
Member.GetMemberAvatar.path=`/get_member_avatar`
/**
* @description DeleteMember url链接，包含baseURL
*/
Member.DeleteMember.fullPath=`${axios.defaults.baseURL}/remove_member`
/**
* @description DeleteMember url链接，不包含baseURL
*/
Member.DeleteMember.path=`/remove_member`

export class News {
 
  /**
  * @summary List News
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListNews(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/news/get_news',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List News Size
  * @param {undefined} [search] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListNewsSize(search,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/list_news_size',
        data:{},
        params:{search,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List Client News
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListClientNews(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/news/client/news',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List Client Projs
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListClientProjects(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/news/client/projs',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List Client Top News
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListClientTopNews(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/news/client/top_news',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary List Client Top Projs
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListClientTopProjects(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/news/client/top_projs',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get News
  * @param {String} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetNews(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_news',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get News Client
  * @param {String} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetNewsClient(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/client/get_news',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Or Update News
  * @param {undefined} [valid_info] 
  * @param {UserModel.NewsItem} [newsitem] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddOrUpdateNews(valid_info,newsitem,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/news/update',
        data:newsitem,
        params:{valid_info},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Update News Info
  * @param {undefined} [valid_info] 
  * @param {UserModel.NewsItem} [newsitem] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UpdateNewsInfo(valid_info,newsitem,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/news/update/info',
        data:newsitem,
        params:{valid_info},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Upload Banner
  * @param {UserModel.Body_UploadNewsBanner} [body_uploadnewsbanner] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async UploadNewsBanner(body_uploadnewsbanner,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/upload_banner',
        data:body_uploadnewsbanner,
        params:{},
        headers:{
          "Content-Type":"multipart/form-data"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get News Banner
  * @param {String} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetNewsBanner(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/get_news_banner',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Delete News
  * @param {String} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async DeleteNews(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/remove_news',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class News static method properties bind
/**
* @description ListNews url链接，包含baseURL
*/
News.ListNews.fullPath=`${axios.defaults.baseURL}/news/get_news`
/**
* @description ListNews url链接，不包含baseURL
*/
News.ListNews.path=`/news/get_news`
/**
* @description ListNewsSize url链接，包含baseURL
*/
News.ListNewsSize.fullPath=`${axios.defaults.baseURL}/list_news_size`
/**
* @description ListNewsSize url链接，不包含baseURL
*/
News.ListNewsSize.path=`/list_news_size`
/**
* @description ListClientNews url链接，包含baseURL
*/
News.ListClientNews.fullPath=`${axios.defaults.baseURL}/news/client/news`
/**
* @description ListClientNews url链接，不包含baseURL
*/
News.ListClientNews.path=`/news/client/news`
/**
* @description ListClientProjects url链接，包含baseURL
*/
News.ListClientProjects.fullPath=`${axios.defaults.baseURL}/news/client/projs`
/**
* @description ListClientProjects url链接，不包含baseURL
*/
News.ListClientProjects.path=`/news/client/projs`
/**
* @description ListClientTopNews url链接，包含baseURL
*/
News.ListClientTopNews.fullPath=`${axios.defaults.baseURL}/news/client/top_news`
/**
* @description ListClientTopNews url链接，不包含baseURL
*/
News.ListClientTopNews.path=`/news/client/top_news`
/**
* @description ListClientTopProjects url链接，包含baseURL
*/
News.ListClientTopProjects.fullPath=`${axios.defaults.baseURL}/news/client/top_projs`
/**
* @description ListClientTopProjects url链接，不包含baseURL
*/
News.ListClientTopProjects.path=`/news/client/top_projs`
/**
* @description GetNews url链接，包含baseURL
*/
News.GetNews.fullPath=`${axios.defaults.baseURL}/get_news`
/**
* @description GetNews url链接，不包含baseURL
*/
News.GetNews.path=`/get_news`
/**
* @description GetNewsClient url链接，包含baseURL
*/
News.GetNewsClient.fullPath=`${axios.defaults.baseURL}/client/get_news`
/**
* @description GetNewsClient url链接，不包含baseURL
*/
News.GetNewsClient.path=`/client/get_news`
/**
* @description AddOrUpdateNews url链接，包含baseURL
*/
News.AddOrUpdateNews.fullPath=`${axios.defaults.baseURL}/news/update`
/**
* @description AddOrUpdateNews url链接，不包含baseURL
*/
News.AddOrUpdateNews.path=`/news/update`
/**
* @description UpdateNewsInfo url链接，包含baseURL
*/
News.UpdateNewsInfo.fullPath=`${axios.defaults.baseURL}/news/update/info`
/**
* @description UpdateNewsInfo url链接，不包含baseURL
*/
News.UpdateNewsInfo.path=`/news/update/info`
/**
* @description UploadNewsBanner url链接，包含baseURL
*/
News.UploadNewsBanner.fullPath=`${axios.defaults.baseURL}/upload_banner`
/**
* @description UploadNewsBanner url链接，不包含baseURL
*/
News.UploadNewsBanner.path=`/upload_banner`
/**
* @description GetNewsBanner url链接，包含baseURL
*/
News.GetNewsBanner.fullPath=`${axios.defaults.baseURL}/get_news_banner`
/**
* @description GetNewsBanner url链接，不包含baseURL
*/
News.GetNewsBanner.path=`/get_news_banner`
/**
* @description DeleteNews url链接，包含baseURL
*/
News.DeleteNews.fullPath=`${axios.defaults.baseURL}/remove_news`
/**
* @description DeleteNews url链接，不包含baseURL
*/
News.DeleteNews.path=`/remove_news`

export class Publication {
 
  /**
  * @summary List Publications
  * @param {undefined} [search] 
  * @param {Number} [offset] 
  * @param {Number} [limit] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async ListPublications(search,offset,limit,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/publications/get_publications',
        data:{},
        params:{search,offset,limit},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Get Publication
  * @param {String} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async GetPublication(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/publications/get_publication',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Add Or Update Publication
  * @param {UserModel.PublicationItem} [publicationitem] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async AddOrUpdatePublication(publicationitem,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/publications/update',
        data:publicationitem,
        params:{},
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
 
  /**
  * @summary Delete Publication
  * @param {String} [id] 
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async DeletePublication(id,cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/publications/remove',
        data:{},
        params:{id},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class Publication static method properties bind
/**
* @description ListPublications url链接，包含baseURL
*/
Publication.ListPublications.fullPath=`${axios.defaults.baseURL}/publications/get_publications`
/**
* @description ListPublications url链接，不包含baseURL
*/
Publication.ListPublications.path=`/publications/get_publications`
/**
* @description GetPublication url链接，包含baseURL
*/
Publication.GetPublication.fullPath=`${axios.defaults.baseURL}/publications/get_publication`
/**
* @description GetPublication url链接，不包含baseURL
*/
Publication.GetPublication.path=`/publications/get_publication`
/**
* @description AddOrUpdatePublication url链接，包含baseURL
*/
Publication.AddOrUpdatePublication.fullPath=`${axios.defaults.baseURL}/publications/update`
/**
* @description AddOrUpdatePublication url链接，不包含baseURL
*/
Publication.AddOrUpdatePublication.path=`/publications/update`
/**
* @description DeletePublication url链接，包含baseURL
*/
Publication.DeletePublication.fullPath=`${axios.defaults.baseURL}/publications/remove`
/**
* @description DeletePublication url链接，不包含baseURL
*/
Publication.DeletePublication.path=`/publications/remove`

export class common {
 
  /**
  * @summary Home
  * @param {CancelTokenSource} [cancelSource] Axios Cancel Source 对象，可以取消该请求
  * @param {Function} [uploadProgress] 上传回调函数
  * @param {Function} [downloadProgress] 下载回调函数
  */
  static async Home(cancelSource,uploadProgress,downloadProgress,baseURL){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        },
        onUploadProgress:uploadProgress,
        onDownloadProgress:downloadProgress
      }
      if (baseURL!==undefined){
        options.baseURL = baseURL
      }
      // support wechat mini program
      if (cancelSource!=undefined){
        options.cancelToken = cancelSource.token
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response){
          if (err.response.data)
            reject(err.response.data)
          else
            reject(err.response);
        }else{
          reject(err)
        }
      })
    })
  }
}

// class common static method properties bind
/**
* @description Home url链接，包含baseURL
*/
common.Home.fullPath=`${axios.defaults.baseURL}/`
/**
* @description Home url链接，不包含baseURL
*/
common.Home.path=`/`
