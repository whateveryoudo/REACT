import * as React from 'react'
import {Row,Col} from '../index'
import '../style/flexAlign.less'


const DemoBox = (props:any) => (<p className={`height-${props.value}`}>{props.children}</p>)

export default class FlexAlign extends React.Component{
    render(){
        return (
            <div>
                <Row>
                    <Col span={4}><DemoBox value={30}>Col-4</DemoBox></Col>
                    <Col span={4}><DemoBox value={50}>Col-4</DemoBox></Col>
                    <Col span={4}><DemoBox value={100}>Col-4</DemoBox></Col>
                </Row>
                <a href="http://www.baidu.com" target="_blank">跳转pdf预览界面</a>
            </div>
        )
    }
}