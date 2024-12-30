const path = require('path');
const  nodeWindows = require('node-windows')

const scriptPath = path.join(__dirname)
const projectRoot = path.join(scriptPath, '..')
const appPath = path.join(projectRoot, 'src')
const indexFilePath = path.join(appPath, 'index.js')

const Service = nodeWindows.Service

// Create a new service object
const svc = new Service({
  name: '',
  description: '',
  script: indexFilePath,
  nodeOptions: [],
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start()
  console.info('服务安装成功')
})

// uninstall
svc.on('uninstall', function () {
  svc.stop()
  console.info('服务卸载成功')
})

svc.on('error', function (e) {
  console.info('发生错误:', e)
})

svc.on('alreadyinstalled', function () {
  console.info('服务已经安装')
})

svc.on('alreadyuninstalled', function () {
  console.info('服务已经卸载')
})

svc.on('start', function () {
  console.info('服务启动')
})

svc.on('stop', function () {
  console.info('服务停止')
})

svc.on('invalidinstallation', function (e) {
  console.info('服务安装失败', e)
})

// 根据用户传输的参数，判断是安装还是卸载 install 为安装，uninstall 为卸载
// 如果什么都不输入，那么提示用户输入参数
const arg = process.argv[2]
switch (arg) {
  case 'install':
    svc.install()
    break
  case 'uninstall':
    svc.uninstall()
    break
  default:
    console.info('允许的参数： install 或 uninstall')
    break
}