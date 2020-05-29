import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import BasicRipple from '../BasicRipple';
import { Fold } from '../Animate';
import { MenuContext } from './MenuContext';
import "./index.scss";

const SubMenu=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        title,
        icon,
        keyProp
    }=props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("submenu", customizePrefixCls);

    const { openKeys,onSubMenuClick } =useContext(MenuContext);

    const handleSubMenuClick=(e)=>{
        e.stopPropagation();
        if(onSubMenuClick){
            onSubMenuClick(e,keyProp);
        }
    }

    let expanded=openKeys.indexOf(keyProp)>-1;


    return (
        <BasicRipple
            disabledTouchRipple
            component="li"
            ref={ref}
            style={{
                ...style
            }}
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-icon`]:icon
                    }
                )
            }
            role="submenu"
        >
            <BasicRipple className={classNames(
                `${prefixCls}-title`,
                 {
                    [`${prefixCls}-expanded`]:expanded
                 }
            )} onClick={handleSubMenuClick}>
                {!!icon && <Icon name={icon} />}
                <span>{title}</span>
                {<Icon name="arrow-thin-down" />}
            </BasicRipple>

            <Fold in={expanded} component={"ul"} className={`${prefixCls}-fold`}>
              {
                    React.Children.map(children, child => {
                        return React.cloneElement(child, {
                            keyProp:child.key,
                            onItemClick: (e, props) => handleClickItem(e, props, child.key),
                        })
                    })
                }
            </Fold>
            
        </BasicRipple>
    )
});

SubMenu.propTypes={
    //内容
    children: PropTypes.node,
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义样式
    style:PropTypes.object,
    //sunmenu的标题
    title:PropTypes.string,
    //icon图标
    icon:PropTypes.string,
    //控制子item是否是选中状态
    isSelected:PropTypes.bool,
    //key
    keyProp:PropTypes.string
};

export default SubMenu;