import React from 'react'
import {ChromePicker, SketchPicker} from 'react-color'
const pickers = {
    chrome: ChromePicker,
    sketch: SketchPicker,
};
const noop = () => {}
export default class Index extends React.Component {
    static defaultProps = {
        onChange : noop,
        onChangeComplete : noop,
        position : 'bottom' //默认颜色选择在下方
    }
    static getDerivedStateFromProps(props){
        if('color' in props){
            return {
                color : props.color
            };
        }
        return null
    }

    state = {
        displayColorPicker : false
    }
    handleChange = (color) => {
        const {onChange} = this.props;
        this.setState({
            color : color.hex
        })
        onChange(color.hex,color);
    }
    handleChangeComplete = color => {
        const {onChangeComplete} = this.props;
        this.setState({
            color : color.hex
        })
        onChangeComplete(color.hex,color);
    }
    handleClick = () => {
        const {displayColorPicker} = this.state;
        this.setState({
            displayColorPicker : !displayColorPicker
        })
    }
    handleClose = () => {
        this.setState({
            displayColorPicker : false
        })
    }
    render() {
        const {
            small,
            type,
            position
        } = this.props;
        const Picker = pickers[type];

        const { displayColorPicker,color } = this.state;

        const styles = {
            color : {
                width : small ? '30px' : '120px',
                height : small ? '16px' : '24px',
                borderRadius : '2px',
                background : color
            },
            swatch : {
                padding : '1px',
                background:"#fff",
                borderRadius:"2px",
                boxShadow :'0 0 0 1px rgba(0,0,0,.1)',
                cursor : 'pointer',
                display : 'inline-block'
            },
            popover : {
                position : 'absolute',
                zIndex : '2'
            },
            cover : {
                position : 'fixed',
                top : '0px',
                bottom : '0px',
                left : '0px',
                right : '0px',
            },
            wrapper : {
                position:'inherit',
                zIndex : 100
            }

        }
        const picker = displayColorPicker ? (
            <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose}/>
                <div style={styles.wrapper}>
                    <Picker
                    {...this.props}
                        color={color}
                        onChange={this.handleChange}
                        onChangeComplete = {this.handleChangeComplete}
                        />
                </div>

            </div>

        ) : null;


        const swatch = (
            <div style={styles.swatch} onClick={this.handleClick}>
                <div style={styles.color}/>
            </div>
        )
        if(position === 'top'){
            return (
                <div>
                    {picker}
                    {swatch}
                </div>
            )
        }

        return (
            <div>
                {swatch}
                {picker}
            </div>
        )
    }
}