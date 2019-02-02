export default {
    //模拟信息
    'GET /api/currentUser' : {
        name: '小兴',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
            {
                key: '0',
                label: '很有想法的',
            },
            {
                key: '1',
                label: '专注设计',
            },
            {
                key: '2',
                label: '辣~',
            },
            {
                key: '3',
                label: '大长腿',
            },
            {
                key: '4',
                label: '川妹子',
            },
            {
                key: '5',
                label: '海纳百川',
            },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        geographic: {
            province: {
                label: '浙江省',
                key: '330000',
            },
            city: {
                label: '杭州市',
                key: '330100',
            },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
    },
    'POST /api/login/account' : (req,res) => {
        //模拟登录
        const {password,type,userName} = req.body;
        //admin
        if(userName === 'admin' && password === 'ant.design'){
            res.send({
                status : 'ok',
                type,
                currentAuthority : 'admin'
            })
            return;
        }
        //user
        if(userName === 'user' && password === ' ant.design'){
            res.send({
                status : 'ok',
                type,
                currentAuthority : 'user'
            })
            return;
        }
        res.send({
            status : 'error',
            type,
            currentAuthority : 'guest'
        })

    },

}