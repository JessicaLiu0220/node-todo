const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
    //读取之前的任务
    const list = await db.read()
    //往里面添加一个title任务
    list.push({ title, done: false })
    //存储任务到本地文件
    await db.write(list)
}
module.exports.clear = async () => {
    await db.write([])
}
module.exports.showAll = async () => {
    //读取数据
    const list = await db.read()
    printTask(list)
},
    function UpDateTitle(list, index) {
        inquirer
            .prompt({
                type: 'input',
                name: 'title',
                message: '请输入新的任务名',
                default: list[index].title
            }).then(answer => {
                list[index].title = answer.title
                db.write(list)
            })
    },

    function askForAction(list, index) {
        inquirer
            .prompt(
                {
                    type: 'list',
                    name: 'action',
                    message: '请选择要进行的操作',
                    choices: [
                        { name: '退出', value: 'quit' },
                        { name: '已完成', value: 'markAsDone' },
                        { name: '未完成', value: 'markAsUnDone' },
                        { name: '更改标题', value: 'UpDateTitle' },
                        { name: '删除', value: 'remove' },
                    ]
                })
            .then(answer2 => {
                switch (answer2.action) {
                    case 'markAsDone':
                        list[index].done = true
                        db.write(list)
                        break;
                    case 'markAsUnDone':
                        list[index].done = false
                        db.write(list)
                        break;
                    case 'UpDateTitle':
                        UpDateTitle(list, index)
                        break;
                    case 'remove':
                        list.splice(index, 1)
                        db.write(list)
                        break;
                }
            });
    }
function askForCreateTask(list) {
    inquirer
        .prompt({
            type: 'input',
            name: 'title',
            message: '请输入需要创建的任务名',
        }).then(answer => {
            list.push({
                title: answer.title,
                done: false
            })
            db.write(list)
        })
}

function printTask(list) {
    //printTask
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择你要进行的操作?',
                choices: [{ name: '退出', value: '-1' }, ...list.map((task, index) => {
                    return { name: `${task.done ? '[x]' : '[_]'} ${index + 1}:${task.title}`, value: index }
                }), { name: '创建任务', value: '-2' }]
            })
        .then(answer => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                askForAction(list, index)
            } else if (index === -2) {
                askForCreateTask(list)

            }
        });
}




