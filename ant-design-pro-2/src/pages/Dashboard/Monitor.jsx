import React from 'react'
import {Row,Col,Card} from 'antd'
import {WaterWave} from '@/components/Charts'
import { formatMessage, FormattedMessage } from 'umi/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent'
export default class Monitor extends React.Component {

    render() {
        return (
            <GridContent>
                <Row>
                    <Col>
                        <Card
                            title={
                                <FormattedMessage
                                    id="app.monitor.resource-surplus"
                                    defaultMessage="Resource Surplus"
                                />
                            }
                            bodyStyle={{textAlign:'center',fontSize:0}}
                            bordered={false}
                        >
                            <WaterWave percent={60}/>
                        </Card>
                    </Col>
                </Row>
            </GridContent>
        )
    }
}