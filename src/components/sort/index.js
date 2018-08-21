import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

const Sort = ({ sortKey, onSort, children }) =>
    <Button onClick={() => onSort(sortKey)} className="button-inline">
        {children}
    </Button>;

Sort.propTypes = {
    onSort: PropTypes.func,
    sortKey: PropTypes.string,
    children: PropTypes.node
};

export default Sort;
