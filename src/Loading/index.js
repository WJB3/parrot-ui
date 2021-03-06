import React from 'react';
import { classNames } from '../components/helper/className';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext';
import { typeEnum } from '../components/color';
import "./index.scss";

const Loading = (Props) => {

    const SIZE = 44;

    const {
        prefixCls: customizePrefixCls,
        className,
        variant = 'indeterminate',
        thickness = 3.6,
        size = 40,
        style,
        color = "primary",
        children,
        overlayColor="rgba(255,255,255,.8)",
        isLoading=true,
        tip="",
        tipColor,
        fullScreen,
        ...restProps
    } = Props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("loading", customizePrefixCls);

    const classes = classNames(prefixCls, className);

    let index = Object.values(typeEnum).findIndex(item => item === color);//判断是否颜色类型

    const loading = (<div className={classes} {...restProps} style={{ color: index === -1 ? color : "", width: size, height: size, ...style }}>
        <svg className={classNames(`${prefixCls}-svg`)} viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
            <circle className={classNames(
                `${prefixCls}-circle`,
                {
                    [`${prefixCls}-indeterminate`]: variant === 'indeterminate',
                    [`${prefixCls}-${color}`]: index > -1
                }
            )}
                cx={SIZE}
                cy={SIZE}
                r={(SIZE - thickness) / 2}
                fill="none"
                strokeWidth={thickness}
            ></circle>
        </svg>
    </div>)

    return children||fullScreen?<div className={classNames(`${prefixCls}-container`)}>
        {isLoading && <div className={classNames(`${prefixCls}-overlay`,{
            [`${prefixCls}-fullScreen`]:fullScreen
        })} style={{backgroundColor:overlayColor}}>
            {tip?<div className={classNames(`${prefixCls}-overlay-tipContainer`)}><div>{loading}</div><div style={{lineHeight:"initial",...tipColor}}>{tip}</div></div>:loading}
        </div>} 
        {children}
     
    </div>:loading
}

Loading.propTypes={
   
    //孩子节点
    children:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //loading的尺寸
    size:PropTypes.number,
    //loading的颜色
    color:PropTypes.string,
    //是否全屏
    fullScreen:PropTypes.bool,
    //蒙层
    overlayColor:PropTypes.string
};


export default Loading;