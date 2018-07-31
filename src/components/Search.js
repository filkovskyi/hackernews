import React, {Component} from 'react';

class Search extends Component {
    render() {
        const {value, onChange} = this.props;

        return (
            <div className="form-wrapper">
                <form>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                </form>
            </div>
        );
    }
}

export default Search;
