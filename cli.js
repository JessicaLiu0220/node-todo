#!/usr/bin/env/ node

const program = require('commander')
const api = require('./index')
program
    .option('-a, --add', 'add a task')//声明命令行的选项

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0, -1).join(' ')
        api.add(words).then(() => { console.log('添加成功') }, () => { console.log('添加失败') })
    });
program
    .command('clear')
    .description('clear all task')
    .action(() => {
        api.clear().then(() => { console.log('清除完毕') }, () => { console.log('清除失败') })
    });


program.parse(process.argv);
if (process.argv.length === 2) {
    api.showAll()
}