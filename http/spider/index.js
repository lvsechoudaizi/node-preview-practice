const originRequest = require('request');
const superagent = require('superagent');
// 读取，操作并写入电子表格数据和样式到 XLSX 和 JSON 文件。
const ExcelJS = require('exceljs');
// 编码类型
const iconv =  require('iconv-lite');
// 提取网页中的字段，后端的jquery
const cheerio = require('cheerio');
// 
const FileSaver = require('file-saver');
// 
const Blob = require('cross-blob');
// 
const fs = require('fs');
// 
const xlsx = require('node-xlsx');

// function request(url, callback){
//     const option = {
//         encoding: null
//     }
//     originRequest(url, option, callback)
// }

// const url = `https://learn.kaikeba.com/video/244646`
// request( url, function(err, res, body){
//     if (!err && res.statusCode == 200) {
//         // 输出网页内容
//         // buffer转字符串: data + ""
//         console.log('body',body + '');
//       }
//     // console.log('body', res);
//     // const html = iconv.decode('gb2312')
//     // console.log('html', html);
// })
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';

// const workbook = new ExcelJS.Workbook()

// workbook.creator = 'Web';
// workbook.lastModifiedBy = 'Web';
// workbook.created = new Date();
// workbook.modified = new Date();
// workbook.lastPrinted = new Date();

//     // Add a Worksheet
// worksheet = workbook.addWorksheet('File');

//     // Title
//     const title = 'Excel file example';

//     // Add Row
// worksheet.addRow([title]);

// workbook.xlsx.writeBuffer().then((data) => {
//     const blob = new Blob([data], {type: EXCEL_TYPE});
//     console.log(1111);
//     // Given name
//     FileSaver.saveAs(blob, 'download.xlsx');
// });

// 写入xlsx
const writeXlsx = (data, name, sheetOptions) => {
    const buffer = xlsx.build(data, sheetOptions)
    fs.writeFile(__dirname + `/excel/${name}.xlsx`, buffer, function(err){
        if(err) return
        console.log(`${name}课程写入xlsx已经结束`)
    })
}


const customSuperAgent = (url) => {
    const cookie = 'gr_user_id=0ce012ec-0221-4321-b82c-54e0d1468f68; 99f53b614ce96c83_gr_session_id=9aef5954-c5fc-4b3a-a009-df638621500f; 99f53b614ce96c83_gr_session_id_9aef5954-c5fc-4b3a-a009-df638621500f=true; client_id=57767985; ssoToken=fbffa2e7df242f93e0ed541709fd9d22; access-edu_online=e317a1c29c47e68905bbdde677901229; kd_user_id=5ca582fe-d681-41ce-b42f-139829b67792; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_log_id=UBMuLAvvAUy7RGYoQIM%3A350cebdc-76ea-477f-a94b-909413e191f0%3A11f06832-39ed-48df-b8d9-23255426fa7b; everySentence_16=32; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_kuickDeal_leaveTime=1615859034549; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_kuickDeal_pageIndex=4; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_view_log_id=sXtcD0RMoiS4Dexlmiu'
    return new Promise((resolve, reject) => {
        superagent.get(url).set('Cookie', cookie).set('authorization', 'Bearer pc:e317a1c29c47e68905bbdde677901229').end((err,res) =>{
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
    
}

const data = []

const excuteAngent = async () => {
    const listUrl = 'https://weblearn.kaikeba.com/student/course/list'
    await customSuperAgent(listUrl).then(async res => {
        const { vip = [] } = res.body.data
        if( vip && vip.length ){
            for(let v = 0; v < vip.length; v++){
                data.push({
                    name: vip[v].course_name,
                    data: []
                })
                const CourseUrl = `https://weblearn.kaikeba.com/student/courseinfo?course_id=${vip[v].course_id}&__timestamp=1615859043414`
                 // 1.获取课程list
                 await customSuperAgent(CourseUrl).then(async res => {
                    const { chapter_list = [], course_name } = res.body.data
                    // 1.获取章节list
                    if( chapter_list && chapter_list.length ){
                        for(let chapter = 0; chapter < chapter_list.length; chapter++){
                            const { chapter_name, course_id, chapter_id } = chapter_list[chapter]
                            const url = `https://weblearn.kaikeba.com/student/chapterinfo?course_id=${course_id}&chapter_id=${chapter_id}&__timestamp=1615861194485`
                            await customSuperAgent(url).then(async res => {
                                const { section_list = [] } = res.body.data
                                if( section_list && section_list.length ){
                                    for(let section = 0; section < section_list.length; section++){                                   
                                        const { group_list } = section_list[section]
                                        if( group_list && group_list.length ){
                                            for(let g = 0; g < group_list.length; g++){
                                                const { group_name, content_list } = group_list[g]                                                                      
                                                if(content_list && content_list.length){
                                                    for(let item = 0; item < content_list.length; item++){
                                                        const { content, content_title } = content_list[item]                               
                                                        if(content && content.length){
                                                            for(let con = 0; con < content.length; con++){
                                                                const { video_id, callback_key, url, name } = content[con]
                                                                const index = data.findIndex(i => i.name === course_name)
                                                                if(video_id){ 
                                                                    const videoUrl = `https://api-vod.baoshiyun.com/vod/v1/platform/media/detail?mediaId=${callback_key}&accessToken=bsy1000000000007.1615946711266.33bd09fc6ead4b42a5c16da7dd21e4eb.2027176802`
                                                                    await customSuperAgent(videoUrl).then(async res => {
                                                                        const { mediaMetaInfo } = res.body.data
                                                                        if(mediaMetaInfo){
                                                                            const { videoGroup } = mediaMetaInfo
                                                                            if(videoGroup && videoGroup.length){
                                                                                const vI = videoGroup.findIndex(v => v.resolution === '超清')
                                                                                if(vI !== -1){
                                                                                    if(index !== -1){
                                                                                        const arr = [`第${chapter + 1}章 ${chapter_name}`, `第${section + 1}节 ${group_name}`,  `点播${item + 1}: ${content_title}`,'', videoGroup[vI].playURL ]
                                                                                        data[index].data.push(arr)
                                                                                    }
                                                                                }else{
                                                                                    const arr = [`第${chapter + 1}章 ${chapter_name}`, `第${section + 1}节 ${group_name}`,  `点播${item + 1}: ${content_title}`,'', videoGroup[0].playURL ]
                                                                                    data[index].data.push(arr)
                                                                                }
                                                                            }
                                                                        }
                                                                        if(v === vip.length - 1 && con === content.length -1){
                                                                            const sheetOptions = {'!cols': [{ wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 250 } ]};
                                                                            writeXlsx(data, '爬取结果', sheetOptions)
                                                                        }
                                                                    }).catch(err => {
                                                                        console.error('获取点播视频地址失败：', err);
                                                                    })
                                                                }else if(url){
                                                                    const arr = [`第${chapter + 1}章 ${chapter_name}`, `第${section + 1}节 ${group_name}`,  `资料${item + 1}: ${content_title}`, name, url ]
                                                                    data[index].data.push(arr)

                                                                    if(v === vip.length - 1 && con === content.length -1){
                                                                        const sheetOptions = {'!cols': [{ wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 250 } ]};
                                                                        writeXlsx(data, '爬取结果', sheetOptions)
                                                                    }
                                                                }                                                              
                                                            }
                                                        }
                                                    }
                                                }                      
                                            }                               
                                        }
                                    }
                                    
                                }
                            }).catch(err => {
                                console.error('获取课程章节的节点list失败：', err);
                            })
                        }
                    }
                }).catch(err => {
                    console.error('获取课程章节list失败：', err);
                })
            }
        }
    }).catch(err => {
        console.error('获取vip课程list失败：', err);
    })
}

excuteAngent()

