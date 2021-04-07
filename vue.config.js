module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'made by liukai',
        productName: 'Turtle computing', //项目名，也是生成的安装文件名，即Turtle computing.exe
        copyright: 'Copyright © 2020', //版权信息
        directories: {
          output: './dist_electron', //输出文件路径
        },
        win: {
          //win相关配置
          icon: './turtle.ico', //图标，当前图标在根目录下，注意这个图标必须是256x256
          target: [
            {
              target: 'nsis', //利用nsis制作安装程序
              arch: [
                'x64', //64位
              ],
            },
          ],
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './turtle.ico', // 安装图标
          uninstallerIcon: './turtle.ico', //卸载图标
          installerHeaderIcon: './turtle.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'Turtle Computing', // 图标名称
        },
      },
    },
  },
}
