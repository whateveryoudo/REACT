

const proxy = {
    //获取咨询列表
    'GET /api/newsListQuery': {
        $desc: '查询最新咨询',
        $params: {
            searchKey: '',
            username: '',
            password: '',
        },
        $body: {
            msg : 'success',
            code : 10000,
            data: {
                monthBillData : {
                    billType : 'day',
                    dataList : [
                        {
                            id: 1,
                            billNo: 'asdas33333',
                            billMoney: 122,
                            billPrince: 20,
                            billOverdue: 20,
                            billFee: 20,
                            repayDate: 2010 - 10 - 5,
                            isRepayed: 1,
                            billState: 1,
                        }
                    ]
                },
                dailyBillData : {

                }
            }
        },
    },
}

export default {

};
