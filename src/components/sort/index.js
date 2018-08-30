import React from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import Button from '../button';

const Sort = ({ sortKey, onSort, children, activeSortKey, isSortReverse }) => {
    const sortClass = classNames(
        'button-inline',
        {'button-active': sortKey === activeSortKey},
        {'up': isSortReverse === false },
        {'down': isSortReverse === true }
    );

    return(

        <Button onClick={() => onSort(sortKey)} className={sortClass}>
            {children}
        </Button>
    );
};

Sort.propTypes = {
    onSort: PropTypes.func,
    sortKey: PropTypes.string,
    children: PropTypes.node
};

export default Sort;
