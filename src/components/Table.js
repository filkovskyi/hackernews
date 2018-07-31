import React from 'react';
import Button  from './Button';

function isSearched(pattern) {
    return function (item) {
        return item.title.toLocaleLowerCase().includes(pattern.toLowerCase());
    }
}

const Table = ({list, pattern, onDismiss}) => {
    return (
        <div className="table-wrapper">
            {list.filter(isSearched(pattern)).map(item =>
                <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <Button onClick={() => onDismiss(item.objectID)}>Remove</Button>
                </div>
            )}
        </div>
    );
};

export default Table;
