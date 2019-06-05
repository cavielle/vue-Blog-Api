const mysql = require('mysql');
const config = require('./config.js');


var pool = mysql.createPool(config.mysql);

const query = function (sql, val) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, val, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                    connection.release();
                })
            }
        })
    })
}

const createTable = (sql) => {
    query(sql, [])
}



const blogtest = (val) => {
    let _sql = 'select * from Article'
    return query(_sql)
}

const getArticleInfo = (val) => {
    // let _sql = `select * from Article where ArticleID = ${val}`
    let _sql = `select * from Article where ArticleShow = 1 ORDER BY ArticlePostTime DESC`
    return query(_sql)
}
const getArticle = (id) => {
    let _sql = `select * from Article where ArticleID = '${id}' && ArticleShow = 1`
    return query(_sql)
}
const postArticle = (id, ImgUrl, show, title, summary, content, tag) => {
    let _sql = `insert into Article(ArticleID,ArticlePostTime,ArticleImgUrl,ArticleShow,ArticleTitle,ArticleSummary,ArticleContent,ArticleTag,ArticleUpdate) values('${id}',NOW(),'${ImgUrl}','${show}','${title}','${summary}','${content}','${tag}',NOW());`
    return query(_sql)
}
const updateArticle = (id, ImgUrl, show, title, summary, content, tag) => {
    let _sql = `UPDATE Article SET ArticleImgUrl = '${ImgUrl}',ArticleShow='${show}',ArticleTitle='${title}',ArticleSummary='${summary}',ArticleContent='${content}',ArticleTag='${tag}',ArticleUpdate=NOW() where ArticleID = '${id}';`
    return query(_sql)
}
const updateShow = (id, show) => {
    let _sql = `UPDATE Article SET ArticleShow = '${show}' where ArticleID = '${id}';`
    return query(_sql)
}

module.exports = {
    blogtest,
    getArticleInfo, //获取所有文章详情
    getArticle,//根据id获取文章详情
    postArticle, //发送文章
    updateShow, //更改文章显示
    updateArticle,//更新文章 
}