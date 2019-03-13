import React from 'react'
import Helmet from 'react-helmet'
import {connect} from '@/models/index'


@connect(state => {
    const {title} = state.page;
    return {
        title
    }
})
export default class FrameTopSideMenu extends React.Component {

    render() {
        const {
            title
        } = this.props;
        const titleText = title?.text || title;
        return (
            <div>
                <Helmet
                    title={
                        typeof titleText === 'string' ? titleText : ''
                    }
                />
                框架界面
            </div>
        )
    }
}