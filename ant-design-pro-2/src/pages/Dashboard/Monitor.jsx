import React from 'react'
import {Row,Col,Card,Tooltip} from 'antd'
import { connect } from 'dva';
import {WaterWave,Gauge,Pie,TagCloud} from '@/components/Charts'
import NumberInfo from '@/components/NumberInfo'
import CountDown from '@/components/CountDown'
import ActiveChart from '@/components/ActiveChart'
import numeral from 'numeral';
import { formatMessage, FormattedMessage } from 'umi/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import styles from './Monitor.less'

const targetTime = new Date().getTime() + 3900000;


@connect(({loading,monitor}) => ({
    loading : loading.models.monitor,
    monitor
}))
export default class Monitor extends React.Component {
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({
            type : 'monitor/fetchTags'
        })
    }
    renderDealInfo = () => {
        return (
            <Row>
                <Col md={6} sm={12} xs={24}>
                    <NumberInfo
                        subTitle={
                            <FormattedMessage
                                id="app.monitor.total-transactions"
                                defaultMessage="Total transactions today"
                            />
                        }
                        suffix="元"
                        total={numeral(1213232).format('0,0')}
                    />
                </Col>
                <Col md={6} sm={12} xs={24}>
                    <NumberInfo
                        subTitle={
                            <FormattedMessage
                                id="app.monitor.sales-target"
                                defaultMessage="Sales target completion rate"
                            />
                        }
                        total="92%"
                    />
                </Col>
                <Col md={6} sm={12} xs={24}>
                    <NumberInfo
                        subTitle={
                            <FormattedMessage
                                id="app.monitor.remaining-time"
                                defaultMessage="Remaining time of activity"
                            />
                        }
                        total={<CountDown target={targetTime} />}
                    />
                </Col>
                <Col md={6} sm={12} xs={24}>
                    <NumberInfo
                        subTitle={
                            <FormattedMessage
                                id="app.monitor.total-transactions-per-second"
                                defaultMessage="Total transactions per second"
                            />
                        }
                        suffix="元"
                        total={numeral(234).format('0,0')}
                    />
                </Col>
            </Row>
        )
    }
    render() {
        const {monitor} = this.props;
        const { tags } = monitor;
        return (
            <GridContent>
                <Row gutter={24}>
                    <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.trading-activity"
                                    defaultMessage="Real-Time Trading Activity"
                                />
                            }
                            bordered={false}
                        >
                            {this.renderDealInfo()}
                           <div className={styles.mapChart}>
                               <Tooltip
                                   title={
                                       <FormattedMessage
                                           id="app.monitor.waiting-for-implementation"
                                           defaultMessage="Waiting for implementation"
                                       />
                                   }
                               >
                                   <img
                                       src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                                       alt="map"
                                   />
                               </Tooltip>
                           </div>
                        </Card>
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.activity-forecast"
                                    defaultMessage="Activity forecast"
                                />
                            }
                            style={{ marginBottom: 24 }}
                            bordered={false}
                        >
                            <ActiveChart/>
                        </Card>
                        <Card
                            title={<FormattedMessage id="app.monitor.efficiency" defaultMessage="Efficiency" />}
                            style={{ marginBottom: 24 }}
                            bodyStyle={{ textAlign: 'center' }}
                            bordered={false}
                        >
                            <Gauge
                                title={formatMessage({ id: 'app.monitor.ratio', defaultMessage: 'Ratio' })}
                                height={180}
                                percent={87}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={12} lg={24} sm={24} xs={24} style={{marginBottom : 24}}>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.proportion-per-category"
                                    defaultMessage="Proportion Per Category"
                                />
                            }
                            bordered={false}
                            className={styles.pieCard}
                        >
                            <Row style={{padding:'16px 0'}}>
                                <Col span={8}>
                                    <Pie
                                        animate={false}
                                        percent={28}
                                        total='28%'
                                        subTitle={
                                            <FormattedMessage id="app.monitor.fast-food" defaultMessage="Fast food" />
                                        }
                                        height={128}
                                        lineWidth={2}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Pie
                                        animate={false}
                                        color="#5DDECF"
                                        percent={22}
                                        subTitle={
                                            <FormattedMessage
                                                id="app.monitor.western-food"
                                                defaultMessage="Western food"
                                            />
                                        }
                                        total="22%"
                                        height={128}
                                        lineWidth={2}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Pie
                                        animate={false}
                                        color="#2FC25B"
                                        percent={32}
                                        subTitle={
                                            <FormattedMessage id="app.monitor.hot-pot" defaultMessage="Hot pot" />
                                        }
                                        total="32%"
                                        height={128}
                                        lineWidth={2}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{marginBottom : 24}}>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.popular-searches"
                                    defaultMessage="Popular Searches"
                                />
                            }
                            bordered={false}
                            bodyStyle={{ overflow: 'hidden' }}
                        >
                            <TagCloud data={tags} height={161}/>
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{marginBottom : 24}}>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.resource-surplus"
                                    defaultMessage="Resource Surplus"
                                />
                            }
                            bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                            bordered={false}
                        >
                            <WaterWave
                                title={
                                    <FormattedMessage id="app.monitor.fund-surplus" defaultMessage="Fund Surplus" />
                                }
                                height={161}
                                percent={60}/>

                        </Card>
                    </Col>
                </Row>
            </GridContent>
        )
    }
}