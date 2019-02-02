import React from 'react'
import {Button,Form} from 'antd'
import classNames from 'classnames'
import styles from './index.less'

const FormItem = Form.Item;
const LoginSubmit = ({className,...rest}) => {
    const clsString = classNames(styles.submit,className);
    return (
        <FormItem>
            <Button size="large" className={clsString} htmlType="submit" type="primary" {...rest}/>
        </FormItem>
    )
}
export default LoginSubmit