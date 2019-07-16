> todo
```
  1.数据集中管理
  2.登录状态管理
  3.本地数据持久化(集成至 `数据集中管理`)
  4.公共模块搭建
```

# iPOS_Cash
收银小应用

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### 文件夹结构
+ src 
  + api
  请求相关(接口地址、统一拦截等)
  + assets 
  项目中所用到的资源文件
  + components
  公共组件
  + router
  路由相关(路由定义、路由拦截器等)
  + utils
  工具函数
  + views
  页面(每个文件夹对应一个page)
  + main.js
  入口文件

+ dist
存放打包后的文件

+ vue.config.js
webpack配置相关(写入相关配置以覆盖默认配置)
+ .postcssrc.js
css预处理器配置(包括对px单位自动转化成vw单位)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### notice
+ 当前配置只是简单配置，根据具体需求可以加以调整、优化，后面根据实际情况优化
+ css编写时，一般组件内`<style></style>`标签需要加上`scoped`属性，以免影响其他地方的css，如果想编写全局性的css，可以放在`src/assets/global.scss`或者`src/assets/helper.scss`中
+ 接口请求，在实例中直接
``` javascript
  this.$http({/* ... */})
```
详见[axios](https://www.kancloud.cn/yunye/axios/234845)文档
+ 本地接口代理可以通过axios中配置