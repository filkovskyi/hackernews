import React, {Component} from 'react';

class Search extends Component {
    render() {
        const {value, onChange, children} = this.props;

        return (
            <div className="form-wrapper">
                <form>
                    { children }
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
