import * as React from 'react'
import {Row,Col} from '../index'



export default class Flex extends React.Component{
    render(){
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row>
                <Row type="flex" justify="end">
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row>
            </div>
        )
    }
}