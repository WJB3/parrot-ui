import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import BaseRipple from '../BaseRipple';
import "./index.scss";

const SelectOption = React.forwardRef((Props,ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        value,
        disabled,
        ...restProps
    } = Props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("select-option", customizePrefixCls);

    const classes = classNames(prefixCls, className);

    return (
        <BaseRipple 
            component="li"
            className={classes}
            value={value}
            enabledTouchRipple={!disabled}
            {...restProps}
        >
            {children}
        </BaseRipple>
    )
});

export default SelectOption;