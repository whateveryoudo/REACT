import React from 'react'
import { List, InputItem, WhiteSpace,NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import './App.css'

const Item = List.Item;
class BasicInputExample extends React.Component {
    componentDidMount() {
        // this.autoFocusInst.focus();
    }
    handleClick = () => {
        this.inputRef.focus();
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                {/*导航*/}
                <div>
                    <NavBar
                        mode="light"
                        icon={<span style={{display:'flex',alignItems:'center'}} ><Icon type="left" /><p style={{width:80}} className="text_ellipsis">填写个人基本资料</p></span>}
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                            <Icon key="1" type="ellipsis" />,
                        ]}
                    >基本资料</NavBar>
                </div>
                <WhiteSpace />
                <List>
                    <InputItem
                        {...getFieldProps('name')}
                        clear
                        placeholder="请输入姓名"
                        ref={el => this.autoFocusInst = el}
                    >姓名</InputItem>
                    <InputItem
                        {...getFieldProps('focus')}
                        clear
                        placeholder="请输入你的身份证号码"
                        ref={el => this.inputRef = el}
                    >身份证号</InputItem>
                    <InputItem
                        {...getFieldProps('focus')}
                        clear
                        type="number"
                        placeholder="请输入你的手机号码"
                        ref={el => this.inputRef = el}
                    >手机号码</InputItem>
                    <Item arrow="horizontal" onClick={() => {}}>职业类型</Item>
                    <Item arrow="horizontal" onClick={() => {}}>房产类型</Item>
                </List>



                <WhiteSpace />
                <List>
                    <InputItem
                        {...getFieldProps('relativeName')}
                        clear
                        placeholder="请输入直属亲属姓名"
                        ref={el => this.autoFocusInst = el}
                    >直系亲属姓名</InputItem>
                    <Item arrow="horizontal" onClick={() => {}}>直系亲属关系</Item>
                    <InputItem
                        {...getFieldProps('mobile')}
                        clear
                        type="number"
                        placeholder="请输入直属亲属电话"
                        ref={el => this.autoFocusInst = el}
                    >直系亲属电话</InputItem>
                </List>
            </div>
        );
    }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper
