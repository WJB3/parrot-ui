import * as React from 'react';
import classNames from 'classnames';
// @ts-ignore
import { TreeContext } from './contextTypes';
import { getDataAndAria } from './util';
import Indent from './Indent';
import { convertNodePropsToEventData } from './utils/treeUtil';

const ICON_OPEN = 'open';
const ICON_CLOSE = 'close';

const defaultTitle = '---';
 
class InternalTreeNode extends React.Component  {
  state = {
    dragNodeHighlight: false,
  };

  selectHandle;

  // Isomorphic needn't load data in server side
  componentDidMount() {
    
  }

  componentDidUpdate() {
    
  }

  onSelectorClick = e => {
    // Click trigger before select/check operation
    const {
      context,
    } = this.props;
 

    if (this.isSelectable()) {
      this.onSelect(e);
    } else {
      this.onCheck(e);
    }
  };

  onSelectorDoubleClick = e => {
    const {
      context: { onNodeDoubleClick },
    } = this.props;
    onNodeDoubleClick(e, convertNodePropsToEventData(this.props));
  };

  onSelect = e => {
    if (this.isDisabled()) return;

    const {
      context: { onNodeSelect },
    } = this.props;
    e.preventDefault();
    onNodeSelect(e, convertNodePropsToEventData(this.props));
  };

  onCheck = e => {
    if (this.isDisabled()) return;

    const { disableCheckbox, checked } = this.props;
    const {
      context: { onNodeCheck },
    } = this.props;

    if (!this.isCheckable() || disableCheckbox) return;

    e.preventDefault();
    const targetChecked = !checked;
    onNodeCheck(e, convertNodePropsToEventData(this.props), targetChecked);
  };

 
 
 

  onDragStart = e => {
    const {
      context: { onNodeDragStart },
    } = this.props;

    e.stopPropagation();
    this.setState({
      dragNodeHighlight: true,
    });
    onNodeDragStart(e, this);

    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer.setData('text/plain', '');
    } catch (error) {
      // empty
    }
  };

  onDragEnter = e => {
    const {
      context: { onNodeDragEnter },
    } = this.props;

    e.preventDefault();
    e.stopPropagation();
    onNodeDragEnter(e, this);
  };

  onDragOver = e => {
    const {
      context: { onNodeDragOver },
    } = this.props;

    e.preventDefault();
    e.stopPropagation();
    onNodeDragOver(e, this);
  };

  onDragLeave = e => {
    const {
      context: { onNodeDragLeave },
    } = this.props;

    e.stopPropagation();
    onNodeDragLeave(e, this);
  };

  onDragEnd = e => {
    const {
      context: { onNodeDragEnd },
    } = this.props;

    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false,
    });
    onNodeDragEnd(e, this);
  };
 

  // Disabled item still can be switch
  onExpand  = e => {
    const {
      context: { onNodeExpand },
    } = this.props;
    onNodeExpand(e, convertNodePropsToEventData(this.props));
  };

  // Drag usage
  setSelectHandle = node => {
    this.selectHandle = node;
  };

  getNodeState = () => {
    const { expanded } = this.props;

    if (this.isLeaf()) {
      return null;
    }

    return expanded ? ICON_OPEN : ICON_CLOSE;
  };

  hasChildren = () => {
    const { eventKey } = this.props;
    const {
      context: { keyEntities },
    } = this.props;
    const { children } = keyEntities[eventKey] || {};

    return !!(children || []).length;
  };

  isLeaf = () => {
    const { isLeaf, loaded } = this.props;
    const {
      context ,
    } = this.props;

    const hasChildren = this.hasChildren();

    if (isLeaf === false) {
      return false;
    }

    return isLeaf || !hasChildren ||  (loaded && !hasChildren);
  };

  isDisabled = () => {
    const { disabled } = this.props;
    const {
      context: { disabled: treeDisabled },
    } = this.props;

    return !!(treeDisabled || disabled);
  };

  isCheckable = () => {
    const { checkable } = this.props;
    const {
      context: { checkable: treeCheckable },
    } = this.props;

    // Return false if tree or treeNode is not checkable
    if (!treeCheckable || checkable === false) return false;
    return treeCheckable;
  };

  
  isSelectable() {
    const { selectable } = this.props;
    const {
      context: { selectable: treeSelectable },
    } = this.props;

    // Ignore when selectable is undefined or null
    if (typeof selectable === 'boolean') {
      return selectable;
    }

    return treeSelectable;
  }

  // Switcher
  renderSwitcher = () => {
    const { expanded, switcherIcon: switcherIconFromProps } = this.props;
    const {
      context: { prefixCls, switcherIcon: switcherIconFromCtx },
    } = this.props;

    const switcherIcon = switcherIconFromProps || switcherIconFromCtx;

    if (this.isLeaf()) {
      return (
        <span className={classNames(`${prefixCls}-switcher`, `${prefixCls}-switcher-noop`)}>
          {typeof switcherIcon === 'function'
            ? switcherIcon({ ...this.props, isLeaf: true })
            : switcherIcon}
        </span>
      );
    }

    const switcherCls = classNames(
      `${prefixCls}-switcher`,
      `${prefixCls}-switcher_${expanded ? ICON_OPEN : ICON_CLOSE}`,
    );
    return (
      <span onClick={this.onExpand} className={switcherCls}>
        {typeof switcherIcon === 'function'
          ? switcherIcon({ ...this.props, isLeaf: false })
          : switcherIcon}
      </span>
    );
  };

  // Checkbox
  renderCheckbox = () => {
    const { checked, halfChecked, disableCheckbox } = this.props;
    const {
      context: { prefixCls },
    } = this.props;
    const disabled = this.isDisabled();
    const checkable = this.isCheckable();

    if (!checkable) return null;

    // [Legacy] Custom element should be separate with `checkable` in future
    const $custom = typeof checkable !== 'boolean' ? checkable : null;

    return (
      <span
        className={classNames(
          `${prefixCls}-checkbox`,
          checked && `${prefixCls}-checkbox-checked`,
          !checked && halfChecked && `${prefixCls}-checkbox-indeterminate`,
          (disabled || disableCheckbox) && `${prefixCls}-checkbox-disabled`,
        )}
        onClick={this.onCheck}
      >
        {$custom}
      </span>
    );
  };

  renderIcon = () => {
    const { loading } = this.props;
    const {
      context: { prefixCls },
    } = this.props;

    return (
      <span
        className={classNames(
          `${prefixCls}-iconEle`,
          `${prefixCls}-icon__${this.getNodeState() || 'docu'}`,
          loading && `${prefixCls}-icon_loading`,
        )}
      />
    );
  };

  // Icon + Title
  renderSelector = () => {
    const { dragNodeHighlight } = this.state;
    const { title, selected, icon, loading, data } = this.props;
    const {
      context: { prefixCls, showIcon, icon: treeIcon, draggable },
    } = this.props;
    const disabled = this.isDisabled();

    const wrapClass = `${prefixCls}-node-content-wrapper`;

    // Icon - Still show loading icon when loading without showIcon
    let $icon;

    if (showIcon) {
      const currentIcon = icon || treeIcon;

      $icon = currentIcon ? (
        <span className={classNames(`${prefixCls}-iconEle`, `${prefixCls}-icon__customize`)}>
          {typeof currentIcon === 'function' ? currentIcon(this.props) : currentIcon}
        </span>
      ) : (
        this.renderIcon()
      );
    } else if ( loading) {
      $icon = this.renderIcon();
    }

    // Title
    const $title = (
      <span className={`${prefixCls}-title`}>
        {typeof title === 'function' ? title(data) : title}
      </span>
    );

    return (
      <span
        ref={this.setSelectHandle}
        title={typeof title === 'string' ? title : ''}
        className={classNames(
          `${wrapClass}`,
          `${wrapClass}-${this.getNodeState() || 'normal'}`,
          !disabled && (selected || dragNodeHighlight) && `${prefixCls}-node-selected`,
          !disabled && draggable && 'draggable',
        )}
        draggable={(!disabled && draggable) || undefined}
        aria-grabbed={(!disabled && draggable) || undefined}
        onClick={this.onSelectorClick}
        onDoubleClick={this.onSelectorDoubleClick}
        onDragStart={draggable ? this.onDragStart : undefined}
      >
        {$icon}
        {$title}
      </span>
    );
  };

  render() {
    const {
      eventKey,
      className,
      style,
      dragOver,
      dragOverGapTop,
      dragOverGapBottom,
      isLeaf,
      isStart,
      isEnd,
      expanded,
      selected,
      checked,
      halfChecked,
      loading,
      domRef,
      active,
      onMouseMove,
      ...otherProps
    } = this.props;
    const {
      context: { prefixCls, filterTreeNode, draggable, keyEntities },
    } = this.props;
    const disabled = this.isDisabled();
    const dataOrAriaAttributeProps = getDataAndAria(otherProps);
    const { level } = keyEntities[eventKey] || {};

    console.log(expanded)

    return (
      <div
        ref={domRef}
        className={classNames(className, `${prefixCls}-treenode`, {
          [`${prefixCls}-treenode-disabled`]: disabled,
          [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]: !isLeaf,
          [`${prefixCls}-treenode-checkbox-checked`]: checked,
          [`${prefixCls}-treenode-checkbox-indeterminate`]: halfChecked,
          [`${prefixCls}-treenode-selected`]: selected,
          [`${prefixCls}-treenode-loading`]: loading,
          [`${prefixCls}-treenode-active`]: active,

          'drag-over': !disabled && dragOver,
          'drag-over-gap-top': !disabled && dragOverGapTop,
          'drag-over-gap-bottom': !disabled && dragOverGapBottom,
          'filter-node': filterTreeNode && filterTreeNode(convertNodePropsToEventData(this.props)),
        })}
        style={style}
       
        onMouseMove={onMouseMove}
        {...dataOrAriaAttributeProps}
      >
        <Indent prefixCls={prefixCls} level={level} isStart={isStart} isEnd={isEnd} />
        {this.renderSwitcher()}
        {this.renderCheckbox()}
        {this.renderSelector()}
      </div>
    );
  }
}

const ContextTreeNode = props => (
  <TreeContext.Consumer>
    {context => <InternalTreeNode {...props} context={context} />}
  </TreeContext.Consumer>
);

ContextTreeNode.displayName = 'TreeNode';

ContextTreeNode.defaultProps = {
  title: defaultTitle,
};

ContextTreeNode.isTreeNode = 1;

export { InternalTreeNode };

export default ContextTreeNode;