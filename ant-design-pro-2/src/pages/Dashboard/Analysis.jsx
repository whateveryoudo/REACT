import React from 'react'
import {Row,Col,Tooltip,Icon,Card,Tabs,DatePicker,Table,Radio} from 'antd'
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import {ChartCard,Field,MiniArea,MiniBar,MiniProgress,Bar,Pie,TimelineChart} from '@/components/Charts'
import Trend from '@/components/Trend'
import NumberInfo from '@/components/NumberInfo'
import Yuan from '@/utils/Yuan'
import {getTimeDistance} from '@/utils/utils'
import {FormattedMessage,formatMessage} from 'umi/locale'
//http://numeraljs.com/#format
import numeral from 'numeral';

import styles from './Analysis.less'

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
@connect(({chart,loading}) => ({
    chart,
    loading : loading.effects['chart/fetch']
}))
export default class Analysis extends React.Component {
    constructor(props){
        super(props);
        this.rankListData = [];//写死排行列表
        for(var i = 0;i < 7;i++){
            this.rankListData.push({
                title : formatMessage({id : 'app.analysis.test'},{no  : i}),
                total : 231231
            })
        }
    }
    state = {
        currentTabKey: '',
        salesType : 'all',//默认全部
        loading : true,
        percentNum : 0,
        rangePickerValue : getTimeDistance('year')  //默认值 全年
    }
    componentDidMount(){
        const {dispatch} = this.props;

        //请求图表数据

        dispatch({
            type : 'chart/fetch',
        })

        this.timeoutId = setTimeout(() => {
            this.setState({
                loading : false,
                percentNum: 70
            })
        },600)
    }
    isActive(type){
        const {rangePickerValue} = this.state;
        const value = getTimeDistance(type);

        //比较当前state是否与选择值相同（moment比较，设置为day,会依次比较year,month是否相同）
        //http://momentjs.cn/docs/#/i18n/
        if(!rangePickerValue[0] || !rangePickerValue[1]){
            return '';
        }
        if(
            rangePickerValue[0].isSame(value[0],'day') &&
            rangePickerValue[1].isSame(value[1],'day')
        ){//比较到天
            return styles.currentDate;
        }

        return '';

    }
    //时间段选择
    selectDate = type => {
        const {dispatch} = this.props;
        this.setState({
            rangePickerValue: getTimeDistance(type)
        })
        //更新表格数据（这里mock返回的是死数据）
        dispatch({
            type : 'chart/fetchSalesData'
        })
    }
    //日期范围选择
    handleRangerPickerChange = rangePickerValue => {
        const {dispatch} = this.props;
        this.setState({
            rangePickerValue
        })
        dispatch({
            type : 'chart/fetchSalesData'
        })
    }
    //筛选不同类型数据
    handleChangeSalesType = e => {

        this.setState({
            salesType: e.target.value
        })
    }
    render() {
        const {loading : stateLoading,percentNum,rangePickerValue,salesType,currentTabKey} = this.state;
        const {chart,loading : propsLoading} = this.props;
        const columns = [
            {
                title : <FormattedMessage id="app.analysis.table.rank" defaultMessage="Rank" />,
                dataIndex : 'index',
                key : 'index'
            },
            {
                title: (
                    <FormattedMessage
                        id="app.analysis.table.search-keyword"
                        defaultMessage="Search keyword"
                    />
                ),
                dataIndex: 'keyword',
                key: 'keyword',
                render: val => (<a href='/'>{val}</a>)
            },
            {
                title: <FormattedMessage id="app.analysis.table.users" defaultMessage="Users" />,
                dataIndex : 'count',
                key : 'count',
                sorter : (a,b) => a.count - b.count,
                className : styles.alignRight
            },
            {
                title : (<FormattedMessage id="app.analysis.table.weekly-range" defaultMessage="Weekly Range" />),
                dataIndex : 'range',
                key : 'range',
                sorter : (a,b) => a.range - b.range,
                render : (text,record) => (
                    <Trend flag={record.status === 1 ? 'down' : 'up'}>
                        <span style={{marginRight:4}}>{text}</span>
                    </Trend>
                ),
                align : 'right'
            }
        ]
        const {
            visitData,
            salesData,
            visitData2,
            searchData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline,
            offlineData = [],
            offlineChartData
        } = chart;
        let salesPieData;
        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
        //筛选不同的数据
        if (salesType === 'all') {
            salesPieData = salesTypeData;
        } else {
            salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
        }
        const loading = propsLoading || stateLoading;//??
        const topColResponsiveProps = {
            xs : 24,
            sm : 12,
            md : 12,
            lg : 12,
            xl : 6,
            style : {marginBottom : 24}
        }
        //下方图表顶部tabItem
        const CustomTab = ({data,currentTabKey : currentKey}) => (
            <Row gutter={8} style={{width:138,margin:'8px 0'}}>
                <Col span={12}>
                    <NumberInfo
                        title={data.name}
                        subTitle={
                            <FormattedMessage
                                id="app.analysis.conversion-rate"
                                defaultMessage="Conversion Rate"
                            />
                        }
                        total={`${data.cvr * 100}%`}
                        gap={2}
                        theme={currentKey !== data.name && 'light'} //选中样式
                    />
                </Col>
                <Col span={12} style={{paddingTop:36}}>
                    <Pie
                        animate={false}
                        color={currentKey !== data.name && '#BDE4FF'}
                        inner={0.55}
                        tooltip={false}
                        margin={[0,0,0,0]}
                        percent={data.cvr * 100}
                        height={64}
                    />
                </Col>
            </Row>
        )
        //销售值额外内容
        const salesExtra = (
            <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                        <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                    </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                    </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                    </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                        <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                    </a>

                    <RangePicker
                        value={rangePickerValue}
                        onChange={this.handleRangerPickerChange}
                        width={256}
                    />
                </div>
            </div>
        )

        return (
            <GridContent>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title={
                                <FormattedMessage id="app.analysis.total-sales" defaultMessage="Total Sales" />
                            }
                            action={
                                <Tooltip
                                    title={
                                        <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />
                                    }
                                >
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            loading={loading}
                            total={() => <Yuan>126560</Yuan>}
                            footer={
                                <Field
                                    label={
                                        <FormattedMessage id="app.analysis.day-sales" defaultMessage="Daily Sales" />
                                    }
                                    value={`￥${numeral(12423).format('0,0')}`}
                                />
                            }
                            contentHeight={46}
                        >
                            <Trend flag="up" colorful={false} style={{marginRight:16}}>
                                <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
                                <span className={styles.trendText}>12%</span>
                            </Trend>
                            <Trend flag="down" reverseColor>
                                <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
                                <span className={styles.trendText}>13%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    {/*图表1*/}
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            loading={loading}
                            bordered={false}
                            title={<FormattedMessage id="app.analysis.visits" defaultMessage="Visits"/>}
                            avatar={
                                <img
                                    style={{width: 56, height: 56}}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                                    alt="indicator"
                                />
                            }
                            action={
                                <Tooltip
                                    title={
                                        <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                                    }
                                >
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(6555).format('0,0')}
                            contentHeight={46}
                            footer={
                                <Field
                                    label={
                                        <FormattedMessage id="app.analysis.day-visits" defaultMessage="Daily Visits"/>
                                    }
                                    value={numeral(1234).format('0,0')}
                                />
                            }
                        >
                            <MiniArea color='#975FE4' data={visitData}/>
                        </ChartCard>
                    </Col>
                    {/*图表2*/}
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            loading={loading}
                            bordered={false}
                            title={<FormattedMessage id="app.analysis.payments" defaultMessage="Payments"/>}
                            action={
                                <Tooltip
                                    title={
                                        <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                                    }
                                >
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(7000).format('0,0')}
                            contentHeight={46}
                            footer={
                                <Field
                                    label={
                                        <FormattedMessage id="app.analysis.conversion-rate" defaultMessage="Conversion Rate"/>
                                    }
                                    value="60%"
                                />
                            }
                        >
                            <MiniBar data={visitData}/>
                        </ChartCard>
                    </Col>
                    {/*进度3*/}
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title={
                                <FormattedMessage
                                    id="app.analysis.operational-effect"
                                    defaultMessage="Operational Effect"
                                />
                            }
                            action={
                                <Tooltip
                                    title={
                                        <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />
                                    }
                                >
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total="78%"
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <Trend flag="up" style={{ marginRight: 16 }}>
                                        <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
                                        <span className={styles.trendText}>12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        <FormattedMessage id="app.analysis.day" defaultMessage="Weekly Changes" />
                                        <span className={styles.trendText}>11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            {/*直接赋值无过渡效果*/}
                            <MiniProgress percent={percentNum} strokeWidth={8} target={80} color="#13C2C2"/>
                        </ChartCard>
                    </Col>
                </Row>
                {/*tabs 区域*/}
                <Card loading={loading} bordered={false} bodyStyle={{padding:0}}>
                    <div className={styles.salesCard}>
                        <Tabs tabBarExtraContent={salesExtra} size="large">
                            <TabPane
                                tab={<FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />}
                                 key="sales"
                            >
                                <Row>
                                    {/*销售额图表*/}
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar
                                                title={
                                                    <FormattedMessage
                                                        id="app.analysis.sales-trend"
                                                        defaultMessage="Sales Trend"
                                                    />
                                                }
                                                height={295}
                                                data={salesData}
                                            />
                                        </div>
                                    </Col>
                                    {/*排行列表*/}
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>
                                                <FormattedMessage
                                                    id="app.analysis.sales-ranking"
                                                    defaultMessage="Sales Ranking"
                                                />
                                            </h4>
                                                <ul className={styles.rankingList}>
                                                    {this.rankListData.map((item,i) => {
                                                        return (
                                                            <li key={item.title}>
                                                              <span className={`${styles.rankingItemNum} ${ i < 3  ? styles.active : '' }`}>
                                                                  {i + 1}
                                                              </span>
                                                                <span className={styles.rankingItemTitle} title={item.title}>
                                                                    {item.title}
                                                                </span>
                                                                <span className={styles.rankingItemValue}>
                                                                    {numeral(item.total).format('0,0')}
                                                                </span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                        </div>
                                    </Col>

                                </Row>
                            </TabPane>
                            {/*访问量趋势*/}
                            <TabPane
                                tab={<FormattedMessage id="app.analysis.visits" defaultMessage="Visits" />}
                                key="views"
                            >
                                <Row>
                                    {/*访问量图表*/}
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar
                                                title={
                                                    <FormattedMessage
                                                        id="app.analysis.sales-trend"
                                                        defaultMessage="Sales Trend"
                                                    />
                                                }
                                                height={295}
                                                data={salesData}
                                            />
                                        </div>
                                    </Col>
                                    {/*排行列表*/}
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>
                                                <FormattedMessage
                                                    id="app.analysis.sales-ranking"
                                                    defaultMessage="Sales Ranking"
                                                />
                                            </h4>
                                            <ul className={styles.rankingList}>
                                                {this.rankListData.map((item,i) => {
                                                    return (
                                                        <li key={item.title}>
                                                              <span className={`${styles.rankingItemNum} ${ i < 3  ? styles.active : '' }`}>
                                                                  {i + 1}
                                                              </span>
                                                            <span className={styles.rankingItemTitle} title={item.title}>
                                                                    {item.title}
                                                                </span>
                                                            <span className={styles.rankingItemValue}>
                                                                    {numeral(item.total).format('0,0')}
                                                                </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </Col>

                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        {/*热门搜索*/}
                        <Card
                            loading={loading}
                            bordered={false}
                            title={
                                <FormattedMessage
                                    id="app.analysis.online-top-search"
                                    defaultMessage="Online Top Search"
                                />
                            }
                            style={{marginTop:24}}
                        >
                            {/*顶部图表*/}
                            <Row gutter={48}>
                                <Col sm={12} xs={24} style={{marginBottom:24}}>
                                    <NumberInfo
                                        subTitle={
                                            <span>
                                                <FormattedMessage
                                                    id="app.analysis.search-users"
                                                    defaultMessage="search users"
                                                />
                                                <Tooltip
                                                    title={
                                                        <FormattedMessage
                                                            id="app.analysis.introduce"
                                                            defaultMessage="introduce"
                                                        />
                                                    }
                                                >
                                                  <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                                                </Tooltip>
                                            </span>
                                        }
                                        gap={8}
                                        total={numeral(13000).format('0,0')}
                                        status='up'
                                        subTotal={15.3}
                                    />
                                    <MiniArea line height={45} data={visitData2}/>
                                </Col>
                                <Col sm={12} xs={24} style={{marginBottom:24}}>
                                    <NumberInfo
                                        subTitle={
                                            <span>
                                                <FormattedMessage
                                                    id="app.analysis.per-capita-search"
                                                    defaultMessage="Per Capita Search"
                                                />
                                                <Tooltip
                                                    title={
                                                        <FormattedMessage
                                                            id="app.analysis.introduce"
                                                            defaultMessage="introduce"
                                                        />
                                                    }
                                                >
                                                  <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                                                </Tooltip>
                                              </span>
                                        }
                                        gap={8}
                                        total={2.7}
                                        status='down'
                                        subTotal={26.5}
                                    />
                                    <MiniArea height={45} line data={visitData2}/>
                                </Col>
                            </Row>
                            {/*下方table*/}
                            <Table
                                loading={loading}
                                rowKey={record => record.index}
                                dataSource={searchData}
                                columns={columns}
                                size="small"
                                lineWidth={4}
                                pagination={{
                                    style : {marginBottom : 0},
                                    pageSize:5
                                }}
                            />
                        </Card>
                    </Col>
                    {/*pie图表*/}
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            className={styles.salesCard}
                            bordered={false}
                            title={
                                <FormattedMessage
                                    id="app.analysis.the-proportion-of-sales"
                                    defaultMessage="The Proportion of Sales"
                                />
                            }
                            style={{marginTop:24,minHeight: 509}}
                            bodyStyle={{padding:24}}
                            extra={
                                <div className={styles.salesCardExtra}>
                                    <div className={styles.salesTypeRadio}>
                                        <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                                            <Radio.Button value="all">
                                                <FormattedMessage id="app.analysis.channel.all" defaultMessage="ALL" />
                                            </Radio.Button>
                                            <Radio.Button value="online">
                                                <FormattedMessage
                                                    id="app.analysis.channel.online"
                                                    defaultMessage="Online"
                                                />
                                            </Radio.Button>
                                            <Radio.Button value="stores">
                                                <FormattedMessage
                                                    id="app.analysis.channel.stores"
                                                    defaultMessage="Stores"
                                                />
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            }
                        >
                            <h4 style={{ marginTop: 8, marginBottom: 32 }}>
                                <FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />
                            </h4>
                            <Pie
                                hasLegend
                                subTitle={<FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />}
                                total = {() => <Yuan>{salesTypeData.reduce((prev,now) => now.y + prev,0)}</Yuan>}
                                height={248}
                                data={salesPieData}
                            />

                        </Card>
                    </Col>
                </Row>

                {/*下方的线下数据*/}
                <Card
                    className={styles.offlineCard}
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding:'0 0 32px 0'}}
                    style={{marginTop:32}}
                >
                    <Tabs activeKey={activeKey}>
                        {offlineData.map(shop => {
                            return (
                                <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey}/>} key={shop.name}>
                                    <div style={{padding:'0 24px'}}>
                                        <TimelineChart
                                            height={400}
                                            titleMap = {{
                                                y1: formatMessage({ id: 'app.analysis.traffic' }),
                                                y2: formatMessage({ id: 'app.analysis.payments' }),
                                            }}
                                            data={offlineChartData}/>
                                    </div>
                                </TabPane>
                            )
                        })}
                    </Tabs>


                </Card>

            </GridContent>
        )
    }
}