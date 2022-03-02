const homedir = require('os').homedir()
const home = process.env.HOME || homedir;
const p = require('path')
const dbPath = p.join(home, '.todo')
const fs = require('fs');

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) return reject(error)//保存失败
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)//保存成功

            })
        })

    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)//对象变成字符串存储到本地
            fs.writeFile(path, string, (error) => {
                if (error) return reject()
                resolve()
            })
        })

    }
}
module.exports = db