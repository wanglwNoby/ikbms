# 项目文件夹树
|--assets // 资源，静态
  |--images    //  存放图片
|--common // 公共类
  |--api    //  存放axios请求接口,每个主要页面独立一个接口文档，其中的组件等接口都归纳到其所在的主要页面中
    |--global.tsx   // 全局接口，登录，布局...
    |--****.tsx     // 其他主页面所含接口，应与pages一一对应
  |--styles //  存放主题皮肤样式
|--pages（views）// 展示的页面
  |--页面1
|--components // 具体到页面的组件，头部，尾部，导航栏等等
  |--cores // 重要组件,核心组件
    |--主组件1
  |--containers // 容器组件
    |--容器组件1
  |--displays // 展示组件，类似最新知识，公告，热点这些
    |--展示组件1
  |--组件1 // 其他组件
  |--组件2
|--utils //工具类
|--types // typeScript类型检查,主要服务于common/api,与之一一对应，命名也必须一致
|--redux // 状态管理
  |--actions 
  |--reducers
|--router // 路由,未用到
