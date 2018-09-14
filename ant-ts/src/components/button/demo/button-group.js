import React from 'react'
import Button from '../index'
import Icon from '../../icon'
const ButtonGroup = Button.Group;
export default class Buttongroup extends React.Component{
    //按钮组
    render(){
        return (
            <div>
                <h4>basic</h4>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button>OK</Button>
                </ButtonGroup>

                <ButtonGroup>
                    <Button disabled>L</Button>
                    <Button disabled>M</Button>
                    <Button disabled>R</Button>
                </ButtonGroup>

                <h4>with icon</h4>
                <ButtonGroup>
                    <Button type="primary">
                        <Icon type="left"/>Go Back
                    </Button>
                    <Button type="primary">
                        Go forward<Icon type="right" />
                    </Button>
                </ButtonGroup>


                <ButtonGroup>
                    <Button type="primary" icon="cloud" />
                    <Button type="primary" icon="cloud-download" />
                </ButtonGroup>

            </div>
        )
    }

}