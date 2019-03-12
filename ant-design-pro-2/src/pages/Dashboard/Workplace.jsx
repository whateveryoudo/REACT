import React from 'react'
import {connect} from 'dva'
import {Avatar,Row,Col,Card} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import EditLinkGroup from '@/components/EditLinkGroup'
import Link from 'umi/link';
import moment from 'moment'
import styles from './Workplace.less'

@connect(({user,loading,project}) => ({
    currentUser : user.currentUser,
    project,

    currentUserLoading : loading.effects['user/fetchCurrent'],
    projectLoading : loading.effects['project/fetchNotice']
}))
export default class Workplace extends React.Component {
    state = {
        links : [
            {
                title: '操作一',
                href: '',
            },
            {
                title: '操作二',
                href: '',
            },
            {
                title: '操作三',
                href: '',
            },
            {
                title: '操作四',
                href: '',
            },
            {
                title: '操作五',
                href: '',
            },
            {
                title: '操作六',
                href: '',
            }
        ]
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({
            type: 'user/fetchCurrent',
        });
        dispatch({
            type: 'project/fetchNotice',
        });
    }
    handleAdd = () => {
        const lastIndex = this.state.links.length;
        this.setState({
            links : [...this.state.links,{
                title: `操作${lastIndex + 1}`,
                href: '',
            }]
        })
    }
    render() {
        const {
            currentUser,
            currentUserLoading,
            project: { notice },
            projectLoading
        } = this.props;
        const pageHeaderContent =
            currentUser && Object.keys(currentUser).length ? (
                <div className={styles.pageHeaderContent}>
                    <div className={styles.avatar}>
                        <Avatar size="large" src={currentUser.avatar}/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentTitle}>
                            早安,{currentUser.name}
                        </div>
                        <div>
                            {currentUser.title} | {currentUser.group}
                        </div>
                    </div>
                </div>
            ) : null;

        const extraContent = (
            <div className={styles.extraContent}>
                <div className={styles.statItem}>
                    <p>项目数</p>
                    <p>56</p>
                </div>
                <div className={styles.statItem}>
                    <p>团队内排名</p>
                    <p>
                        8<span> / 24</span>
                    </p>
                </div>
                <div className={styles.statItem}>
                    <p>项目访问</p>
                    <p>2,223</p>
                </div>
            </div>
        )
        console.log(notice);
        return (
            <PageHeaderWrapper
                loading={currentUserLoading}
                content={pageHeaderContent}
                extraContent={extraContent}
            >
                <Row gutter={24}>
                    <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            className={styles.projectList}
                            title="进行中的项目"
                            style={{marginBottom:24}}
                            bordered={false}
                            loading={projectLoading}
                            bodyStyle={{padding:0}}
                            extra={<Link to='/'>全部项目</Link>}
                        >

                            {notice.map(item => {
                                return (
                                    <Card.Grid className={styles.projectGrid} key={item.id}>
                                        <Card bodyStyle={{padding:0}} bordered={false}>
                                            <Card.Meta
                                                title={
                                                    <div className={styles.cardTitle}>
                                                        <Avatar size="small" src={item.logo}/>
                                                        <Link to={item.href}>{item.title}</Link>
                                                    </div>
                                                }
                                                description={item.description}
                                            />
                                                <div className={styles.projectItemContent}>
                                                    <Link to={item.memberLink}>{item.member}</Link>
                                                    {item.updatedAt && (
                                                        <span title={item.updatedAt} className={styles.datetime}>
                                                            {moment(item.updatedAt).fromNow()}
                                                        </span>
                                                    )}
                                                </div>
                                        </Card>
                                    </Card.Grid>
                                )
                            })}
                        </Card>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            style={{marginBottom:24}}
                            bordered={false}
                            title='快速开始 / 便捷导航'
                            bodyStyle={{padding:0}}
                        >
                            <EditLinkGroup
                                links={this.state.links}
                                linkElement={Link}
                                onAdd={this.handleAdd}/>
                        </Card>
                        <Card
                            style={{marginBottom:24}}
                            bordered={false}
                            title="XX 指数"
                        >

                        </Card>
                    </Col>

                </Row>
            </PageHeaderWrapper>
        )
    }
}