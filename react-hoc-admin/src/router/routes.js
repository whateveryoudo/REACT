import pageRoutes,{noFrames,noAuths,keepAlives} from '../pages/page-routes'
export const noFrameRoutes = noFrames;//不需要框架的界面
export const noAuthRoutes = noAuths//不需要登录的界面
export const keepAliveRoutes = keepAlives;// 需要keep alive 页面

export default [

].concat(pageRoutes)