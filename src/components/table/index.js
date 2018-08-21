import React from 'react';
import Button  from '../button';
import PropTypes from 'prop-types';
import Sort from '../sort';
import SORTS from '../../App';

const Table = ({list, onDismiss, sortKey, onSort}) => {
    const sortedList = SORTS[sortKey](list);
    return (
        <div className="table">
            <div className="table-header">
                <span style={{ width: '40%' }}>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={onSort}
                    >
                        Title
                    </Sort>
                </span>
                <span style={{ width: '30%' }}>
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                    >
                        Author
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                    >
                        Comments
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={onSort}
                    >
                        Points
                    </Sort>
                </span>
            </div>
            {sortedList.map(item =>
                <div key={item.objectID} className="table-row">
                    <span style={{ width: '40%' }}><a href={item.url}>{item.title}</a></span>
                    <span style={{ width: '30%' }}>{item.author}</span>
                    <span style={{ width: '10%' }}>{item.num_comments}</span>
                    <span style={{ width: '10%' }}>{item.points}</span>
                    <span style={{ width: '10%' }}>
                        <Button onClick={() => onDismiss(item.objectID)} className="button-inline" >Remove</Button>
                    </span>
                </div>
            )}
        </div>
    );
};

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ),
    onDismiss: PropTypes.func
};

export default Table;
