# Ylink
英领 — — 英语交流学习App

## 启动项目
```
yarn install 
yarn start
yarn android
```
确定你已开启虚拟机或者连接手机

## 开发进度
### 2020.01.20
登录、topBar、轮播图

## 要点
react-native-swiper
> 如果报错信息为 `ViewPagerAndroid has been removed from React Native.`你需要找到`/node_modules/react-native-swiper/src/index.js`，将其中的ViewPagerAndroid改为ViewPager，并且通过`import ViewPager from "@react-native-community/viewpager"`引入`viewpager`
无法启动
> 执行start.sh文件