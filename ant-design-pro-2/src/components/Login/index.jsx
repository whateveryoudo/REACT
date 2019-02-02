import React,{Fragment} from 'react'
import classNames from 'classnames'
import {Tabs,Form} from 'antd'
import LoginTab from './LoginTab'
import LoginSubmit from './LoginSubmit'
import LoginItem from './LoginItem'
import styles from './index.less'
//采用react  Context
import LoginContext from './loginContext'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type : props.defaultActiveKey,
            tabs : [],
            active : {}
        }
    }
    static defaultProps = {
        defaultActiveKey : '',
        className : ''
    }
    handleSubmit = e => {
        e.preventDefault();

        const {active,type} = this.state;
        const { form,onSubmit} = this.props;
        //这里会对当前表单字段进行验证判断(active[type]为当前表单含有的字段)
        form.validateFields(active[type],{force : true},(err,values) => {
            onSubmit(err,values);
        })

    }
    onSwitch = type => {
        this.setState({
            type
        });
        const {onTabChange} = this.props;
        onTabChange(type);
    }
    getContext = () => {
        const {tabs} = this.state;
        const {form} = this.props;
        return {
            tabUtil : {
                //新增tab
                addTab : id => {
                    this.setState({
                        tabs : [...tabs,id]
                    })
                },
                //移除tab
                removeTab : id => {
                    this.setState({
                        tabs : tabs.filter(item => item !== id)
                    })
                }
            },
            form,
            updateActive : activeItem => {
                //初始化分组(取第一个field 的name为key)
                const {type,active} = this.state;
                if(active[type]){
                    active[type].push(activeItem)
                }else{
                    active[type] = [activeItem];
                }

                this.setState({
                    active
                })
            }
        }
    }
    render() {
        const {className,children} = this.props;
        const {type,tabs} = this.state;
        const TabChildren = [],otherChildren = [];
        //遍历子,更具typeName 判断类型
        React.Children.forEach(children,item => {
            if(!item){return}

            if(item.type.typeName === 'LoginTab'){
                TabChildren.push(item);
            }else{
                otherChildren.push(item);
            }
        })
        return (
            <LoginContext.Provider value={this.getContext()}>
                <div className={classNames(className,styles.login)}>
                    <Form onSubmit={this.handleSubmit}>
                        {tabs.length ? (
                            <Fragment>
                                <Tabs
                                    activeKey={type}
                                    className={styles.tabs}
                                    onChange={this.onSwitch}
                                    animated={false}>
                                    {TabChildren}
                                </Tabs>
                                {otherChildren}
                            </Fragment>
                        ) : [...children]}
                    </Form>
                </div>
            </LoginContext.Provider>

        )
    }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;

//遍历fields

Object.keys(LoginItem).forEach(item => {
    Login[item] = LoginItem[item];
})


// console.log(new (Form.create()(Login))());
export default Form.create()(Login);