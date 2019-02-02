//g2全局配置

import {track,setTheme} from 'bizcharts'

track(false);


const config = {
    defaultColor : '#1089ff',
    shape : {
        interval: {
            fillOpacity: 1,
        }
    }
}
setTheme(config);