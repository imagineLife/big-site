import React from 'react';

const ListItem = ({
  className, selectedCondition, onClick, txt,
}) => (
  <li
    className={`${className} ${selectedCondition === true ? ' selected' : ''}`}
    onClick={onClick}
  >
    {txt}
  </li>
);

export default ListItem;
