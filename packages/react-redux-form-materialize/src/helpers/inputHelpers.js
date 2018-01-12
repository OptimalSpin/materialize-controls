import cn from 'classnames';

import { ACTIVE_COLOR, DEFAULT_COLOR, DISABLED_COLOR } from './colors';
import getTruthyProps from '../helpers/truthyProps';

export const getErrors = ({ innerState, messages }) => {
  if (innerState.touched) {
    return Array.from(getTruthyProps(innerState.errors || {}))
      .map(val => messages[val[1]])
      .join(', ');
  }

  return '';
};

export const getIconColor = ({
  disabled, innerState, activeIconColor, defaultIconColor,
}) => {
  if (disabled) {
    return DISABLED_COLOR;
  }

  return innerState.focus
    ? activeIconColor || ACTIVE_COLOR
    : defaultIconColor || DEFAULT_COLOR;
};

export const getLabelClassName = ({ innerState }, errors) => (cn({
  active: innerState.focus || innerState.value || errors.length,
}));
