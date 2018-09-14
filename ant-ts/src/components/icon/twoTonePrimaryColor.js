/**
 * Created by 13586 on 2018/9/12.
 */
import ReactIcon from '@ant-design/icons-react';

export function setTwoToneColor(primaryColor) {
    return ReactIcon.setTwoToneColors({primaryColor});
}

export function getTwoToneColor() {
    return ReactIcon.getTwoToneColors().primaryColor;
}