import React from 'react'
import {Form,Input,Button,Row,Col} from 'antd'
import omit from 'omit.js';
import LoginContext from './loginContext'
import ItemMap from './map'
import styles from './index.less'

const FormItem = Form.Item;
const LoginItem = {};

class WarpFormItem extends React.Component{
    static defaultProps = {
        buttonText: '获取验证码',
    };
    state = {count : 0};
    componentDidMount(){
        //初始化key分组
        const {name,updateActive} = this.props;
        if(updateActive){
            updateActive(name);
        }
    }
    //获取options参数
    getFormItemOptions = ({ onChange, defaultValue, rules }) => {
        const options = {
            rules : rules || this.customprops.rules,
        }
        if(onChange){
            options.onChange = onChange;
        }

        if(defaultValue){
            options.defaultValue = defaultValue;
        }

        return options;
    }
    //开启倒计时
    runGetCaptchaCountDown = () => {
        const {countDown} = this.props;
        let count = countDown || 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({count});
            if(count === 0){
                clearInterval(this.interval);
            }
        },1000)
    }
    onGetCaptcha = () => {
        const {onGetCaptcha} = this.props;

        const result = onGetCaptcha ? onGetCaptcha() : null;
        if(result === false){return}

        if(result instanceof Promise){
            result.then(this.runGetCaptchaCountDown);//启动倒计时
        }else{
            this.runGetCaptchaCountDown;
        }
    }
    render(){
        const {count} = this.state;
        const {getFieldDecorator} = this.props.form;

        const {
            name,
            customprops,
            buttonText,
            updateActive,
            countDown,
            type,
            ...restProps
        } = this.props;

        const options = this.getFormItemOptions(this.props);
        const otherProps = restProps || {};
        //验证码单独处理
        if(type === 'Captcha'){
            const inputProps = omit(otherProps,['onGetCaptcha']);

            return (
                <FormItem>
                    <Row gutter={8}>
                        <Col span={16}>
                            {getFieldDecorator(name,options)(
                                <Input {...customprops} {...inputProps}/>
                            )}
                        </Col>
                        <Col span={8}>
                            <Button
                                disabled={count}
                                className={styles.getCaptcha}
                                onClick={this.onGetCaptcha}
                                size="large">
                                {count ? count : buttonText}
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            )
        }

        return (
            <FormItem>
                {getFieldDecorator(name,options)(
                    <Input {...customprops} {...otherProps}/>
                )}
            </FormItem>
        )
    }
}

Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key];
    LoginItem[key] = props => {
        return (
            <LoginContext.Consumer>
                {context => (
                    <WarpFormItem
                        customprops={item.props}
                        {...props}
                        rules={item.rules}
                        type={key}
                        updateActive={context.updateActive}
                        form={context.form}/>
                )}
            </LoginContext.Consumer>
        )
    }
})


export default LoginItem