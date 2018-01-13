import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import omit from 'lodash/omit';
import map from 'lodash/map';

import { getErrors, getIconColor, getLabelClassName } from '../helpers/inputHelpers';

const defaultUlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 1,
  width: '100%',
};

function renderChild(dropdownInput, { props: { disabled, value, children } }) {
  const { innerState } = dropdownInput.props;

  const liClass = cn({
    disabled,
    active: value === innerState.value,
    selected: value === innerState.value,
  });

  return (
    <li className={liClass} key={value} data-value={value} data-disabled={disabled}
        onMouseDown={dropdownInput.onDropdownClick}>
      <span>{children}</span>
    </li>
  );
}

const defaultCaret = (
  <span className="caret">▼</span>
);

export default class DropdownInput extends React.Component {
  static propTypes = {
    innerState: PropTypes.object.isRequired,
    iconPrefix: PropTypes.string,
    iconFactory: PropTypes.func,
    messages: PropTypes.object,
    selectClassName: PropTypes.string,
    selectTagClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    caretClassName: PropTypes.string,
    renderChild: PropTypes.func.isRequired,
    caret: PropTypes.element,
  }

  static defaultProps = {
    renderChild,
    caret: defaultCaret,
  }

  constructor(props) {
    super(props);
    this.state = { showSelect: false };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', this.onPageClick, false);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousedown', this.onPageClick);
    }
  }

  onPageClick = () => {
    this.setState({ showSelect: false });
  }

  onShow = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({ showSelect: true });
  }

  onDropdownClick = (evnt) => {
    evnt.stopPropagation();
    const { currentTarget: { dataset: { value, disabled } } } = evnt;
    if (disabled) {
      return;
    }
    this.setState({ showSelect: false });
    this.props.onChange(value);
  }

  onPreventPropagation = (evnt) => {
    evnt.stopPropagation();
  }

  render() {
    const { props } = this;
    const { showSelect } = this.state;

    const errors = getErrors(props);

    const fieldClassName = cn('input-field', props.className);

    const disabled = props.disabled ? 'disabled' : false;

    const iconColor = getIconColor(props);

    const selectWrapperClassName = cn('select-wrapper', props.selectClassName);

    const inputClassName = cn('select-dropdown', 'validate', 'active', {
      invalid: errors.length,
    }, props.inputClassName);

    const ulClassName = cn('dropdown-content', 'select-dropdown', 'active', props.ulClassName);

    const labelClassName = getLabelClassName(props, errors);

    const ulStyle = Object.assign({
      display: showSelect ? 'block' : 'none',
    }, defaultUlStyle);

    const selectProps = omit(props, [
      'placeholder',
      'innerState',
      'iconPrefix',
      'className',
      'selectClassName',
      'messages',
      'iconFactory',
      'selectTagClassName',
      'inputClassName',
      'caretClassName',
      'ulClassName',
      'renderChild',
      'caret',
    ]);

    selectProps.className = props.selectTagClassName;

    const selectedItem = props.value
      ? props.children.find(chld => chld.props.value.toString() === props.value.toString())
      : undefined;

    const labelStyle = {
      top: errors.length ? '60px' : '0.8rem',
    };

    const PrefixIcon = props.iconPrefix
      ? props.iconFactory(props.iconPrefix)
      : undefined;

    return (
      <div className={fieldClassName}>
        {PrefixIcon &&
        <PrefixIcon style={{ left: '0px' }} className="prefix" color={iconColor}/>
        }
        <div className={selectWrapperClassName} onMouseDown={this.onPreventPropagation}>
          {this.props.caret}
          <input type="text"
                 className={inputClassName}
                 readOnly={true}
                 disabled={disabled}
                 onClick={this.onShow}
                 value={selectedItem && selectedItem.props.children}
          />
          <ul className={ulClassName} style={ulStyle}>
            {
              map(props.children, childProps =>
                this.props.renderChild(this, childProps))
            }
          </ul>
          <select {...selectProps} disabled={disabled}>
            {props.children}
          </select>
        </div>
        <label htmlFor={props.id} className={labelClassName} style={labelStyle}
               data-error={errors}>{props.placeholder}</label>
      </div>
    );
  }
}

