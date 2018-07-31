import React, {Component} from 'react';
import Button  from './Button';

function isSearched(pattern) {
    return function (item) {
        return item.title.toLocaleLowerCase().includes(pattern.toLowerCase());
    }
};

class Table extends Component {
    render() {
        const {list, pattern, onDismiss} = this.props;

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
    }
}

export default Table;
