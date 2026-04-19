export class AwardItem {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     */ 
    constructor(id = undefined,name = undefined){
        this.id = id
        this.name = name
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined
    
}
export class AwardLevel {
  
    /**
     *
     * @param {String} id 
     * @param {String} level 
     */ 
    constructor(id = undefined,level = undefined){
        this.id = id
        this.level = level
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    level=undefined
    
}
export class Body_UploadAvatar {
  
    /**
     *
     * @param {String} user_avatar 
     */ 
    constructor(user_avatar = undefined){
        this.user_avatar = user_avatar
    }
       
    /**
     * 
     * @type {String}
     */
    user_avatar=undefined
    
}
export class Body_UploadMemberAvatar {
  
    /**
     *
     * @param {String} id 
     * @param {String} member_avatar 
     */ 
    constructor(id = undefined,member_avatar = undefined){
        this.id = id
        this.member_avatar = member_avatar
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    member_avatar=undefined
    
}
export class Body_UploadNewsBanner {
  
    /**
     *
     * @param {String} id 
     * @param {String} banner 
     */ 
    constructor(id = undefined,banner = undefined){
        this.id = id
        this.banner = banner
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    banner=undefined
    
}
export class Body_UploadNewsImage {
  
    /**
     *
     * @param {String} id 
     * @param {String} image 
     */ 
    constructor(id = undefined,image = undefined){
        this.id = id
        this.image = image
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    image=undefined
    
}
export class ClientTeam {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     * @param {Array} groups 
     */ 
    constructor(id = undefined,name = undefined,groups = undefined){
        this.id = id
        this.name = name
        this.groups = groups
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined   
    /**
     * 
     * @type {Array}
     */
    groups=undefined
    
}
export class Edu {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     */ 
    constructor(id = undefined,name = undefined){
        this.id = id
        this.name = name
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined
    
}
export class Group {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     */ 
    constructor(id = undefined,name = undefined){
        this.id = id
        this.name = name
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined
    
}
export class HTTPValidationError {
  
    /**
     *
     * @param {Array} detail 
     */ 
    constructor(detail = undefined){
        this.detail = detail
    }
       
    /**
     * 
     * @type {Array}
     */
    detail=undefined
    
}
export class Major {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     */ 
    constructor(id = undefined,name = undefined){
        this.id = id
        this.name = name
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined
    
}
export class MemberAward {
  
    /**
     *
     * @param {String} competitionName 
     * @param {String} level 
     * @param {String} session 
     * @param {String} date 
     * @param {String} region 
     */ 
    constructor(competitionName = undefined,level = undefined,session = undefined,date = undefined,region = undefined){
        this.competitionName = competitionName
        this.level = level
        this.session = session
        this.date = date
        this.region = region
    }
       
    /**
     * 
     * @type {String}
     */
    competitionName=undefined   
    /**
     * 
     * @type {String}
     */
    level=undefined   
    /**
     * 
     * @type {String}
     */
    session=undefined   
    /**
     * 
     * @type {String}
     */
    date=undefined   
    /**
     * 
     * @type {String}
     */
    region=undefined
    
}
export class MemberInfo {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     * @param {String} grade 
     * @param {String} session 
     * @param {String} major 
     * @param {String} title 
     * @param {String} toWhere 
     * @param {String} postAddress 
     * @param {Array} educations 
     * @param {Array} teams 
     * @param {Array} groups 
     * @param {String} introduction 
     * @param {String} photo 
     * @param {Array} awards 
     * @param {String} email 
     * @param {String} mobile 
     */ 
    constructor(id = undefined,name = undefined,grade = undefined,session = undefined,major = undefined,title = undefined,toWhere = undefined,postAddress = undefined,educations = undefined,teams = undefined,groups = undefined,introduction = undefined,photo = undefined,userid = undefined,awards = undefined,email = undefined,mobile = undefined){
        this.id = id
        this.name = name
        this.grade = grade
        this.session = session
        this.major = major
        this.title = title
        this.toWhere = toWhere
        this.postAddress = postAddress
        this.educations = educations
        this.teams = teams
        this.groups = groups
        this.introduction = introduction
        this.photo = photo
        this.userid = userid
        this.awards = awards
        this.email = email
        this.mobile = mobile
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined   
    /**
     * 
     * @type {String}
     */
    grade=undefined   
    /**
     * 
     * @type {String}
     */
    session=undefined   
    /**
     * 
     * @type {String}
     */
    major=undefined   
    /**
     * 
     * @type {String}
     */
    title=undefined   
    /**
     * 
     * @type {String}
     */
    toWhere=undefined   
    /**
     * 
     * @type {String}
     */
    postAddress=undefined   
    /**
     * 
     * @type {Array}
     */
    educations=undefined   
    /**
     * 
     * @type {Array}
     */
    teams=undefined   
    /**
     * 
     * @type {Array}
     */
    groups=undefined   
    /**
     * 
     * @type {String}
     */
    introduction=undefined   
    /**
     * 
     * @type {String}
     */
    photo=undefined   
    /**
     * 
     * @type {Array}
     */
    awards=undefined   
    /**
     * 
     * @type {String}
     */
    email=undefined   
    /**
     * 
     * @type {String}
     */
    mobile=undefined
    
}
export class NewsItem {
  
    /**
     *
     * @param {String} id 
     * @param {String} title 
     * @param {String} description 
     * @param {String} news_type 
     * @param {String} publisher_id 
     * @param {String} content 
     * @param {String} create_time 
     * @param {String} update_time 
     */ 
    constructor(id = undefined,title = undefined,description = undefined,news_type = undefined,publisher_id = undefined,content = undefined,create_time = undefined,update_time = undefined){
        this.id = id
        this.title = title
        this.description = description
        this.news_type = news_type
        this.publisher_id = publisher_id
        this.content = content
        this.create_time = create_time
        this.update_time = update_time
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    title=undefined   
    /**
     * 
     * @type {String}
     */
    description=undefined   
    /**
     * 
     * @type {String}
     */
    news_type=undefined   
    /**
     * 
     * @type {String}
     */
    publisher_id=undefined   
    /**
     * 
     * @type {String}
     */
    content=undefined   
    /**
     * 
     * @type {String}
     */
    create_time=undefined   
    /**
     * 
     * @type {String}
     */
    update_time=undefined
    
}
export class PublicationItem {
  
    /**
     *

     */ 
    constructor(id = undefined,publisher = undefined,DOI = undefined,year = undefined,createDate = undefined,source = undefined,title = undefined,url = undefined,booktitle = undefined,abstract = undefined,ISSN = undefined,language = undefined,chapter = undefined,volume = undefined,number = undefined,pages = undefined,school = undefined,note = undefined,author = undefined,entry_type = undefined,bib = undefined){
        this.id = id
        this.publisher = publisher
        this.DOI = DOI
        this.year = year
        this.createDate = createDate
        this.source = source
        this.title = title
        this.url = url
        this.booktitle = booktitle
        this.abstract = abstract
        this.ISSN = ISSN
        this.language = language
        this.chapter = chapter
        this.volume = volume
        this.number = number
        this.pages = pages
        this.school = school
        this.note = note
        this.author = author
        this.entry_type = entry_type
        this.bib = bib
    }
    
    
}
export class Team {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     */ 
    constructor(id = undefined,name = undefined){
        this.id = id
        this.name = name
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined
    
}
export class ToWhere {
  
    /**
     *
     * @param {String} id 
     * @param {String} name 
     */ 
    constructor(id = undefined,name = undefined){
        this.id = id
        this.name = name
    }
       
    /**
     * 
     * @type {String}
     */
    id=undefined   
    /**
     * 
     * @type {String}
     */
    name=undefined
    
}
export class User {
  
    /**
     *
     * @param {String} userid 
     * @param {String} pwd 
     */ 
    constructor(userid = undefined,name = undefined,pwd = undefined,avatar = undefined,email = undefined,phone = undefined,gender = undefined,invite_code = undefined,role = undefined,apply_time = undefined,last_login = undefined){
        this.userid = userid
        this.name = name
        this.pwd = pwd
        this.avatar = avatar
        this.email = email
        this.phone = phone
        this.gender = gender
        this.invite_code = invite_code
        this.role = role
        this.apply_time = apply_time
        this.last_login = last_login
    }
       
    /**
     * 
     * @type {String}
     */
    userid=undefined   
    /**
     * 
     * @type {String}
     */
    pwd=undefined
    
}
export class UserInfo {
  
    /**
     *
     * @param {String} userid 
     * @param {String} pwd 
     */ 
    constructor(userid = undefined,name = undefined,pwd = undefined,avatar = undefined,email = undefined,phone = undefined,gender = undefined,invite_code = undefined,role = undefined,apply_time = undefined,last_login = undefined){
        this.userid = userid
        this.name = name
        this.pwd = pwd
        this.avatar = avatar
        this.email = email
        this.phone = phone
        this.gender = gender
        this.invite_code = invite_code
        this.role = role
        this.apply_time = apply_time
        this.last_login = last_login
    }
       
    /**
     * 
     * @type {String}
     */
    userid=undefined   
    /**
     * 
     * @type {String}
     */
    pwd=undefined
    
}
export class UserSecurityInfo {
  
    /**
     *
     * @param {String} userid 
     * @param {String} pwd 
     * @param {String} confirm_pwd 
     */ 
    constructor(userid = undefined,pwd = undefined,confirm_pwd = undefined){
        this.userid = userid
        this.pwd = pwd
        this.confirm_pwd = confirm_pwd
    }
       
    /**
     * 
     * @type {String}
     */
    userid=undefined   
    /**
     * 
     * @type {String}
     */
    pwd=undefined   
    /**
     * 
     * @type {String}
     */
    confirm_pwd=undefined
    
}
export class ValidationError {
  
    /**
     *
     * @param {Array} loc 
     * @param {String} msg 
     * @param {String} type 
     * @param {undefined} ctx 
     */ 
    constructor(loc = undefined,msg = undefined,type = undefined,input = undefined,ctx = undefined){
        this.loc = loc
        this.msg = msg
        this.type = type
        this.input = input
        this.ctx = ctx
    }
       
    /**
     * 
     * @type {Array}
     */
    loc=undefined   
    /**
     * 
     * @type {String}
     */
    msg=undefined   
    /**
     * 
     * @type {String}
     */
    type=undefined   
    /**
     * 
     * @type {undefined}
     */
    ctx=undefined
    
}
