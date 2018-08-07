import React, {Component} from 'react';
import Search from './components/Search';
import Table  from './components/Table';
import Button from './components/Button';

import './App.css';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const DEFAULT_HPP = '5';
const DEFAULT_QUERY = 'redux';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY
        };

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    setSearchTopStories(result) {
        const { hits, page } = result;
        const oldGits = page !==0
            ? this.state.result.hits
            : [];
        const updateHits = [...oldGits, ...hits];

        this.setState({
            result: {
                hits: updateHits, page
            }
        })
    };

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedHits = this.state.result.hits.filter(isNotId);
        this.setState({
            result: { ...this.state.result, hits: updatedHits}
        });
    };

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    };

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    };

    fetchSearchTopStories(searchTerm, page = 0) {
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
        
        fetch(url)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    };

    componentDidMount() {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    render() {
        const {result, searchTerm} = this.state;
        const page = (result && result.page || 0);

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        <span>Search</span>
                    </Search>
                </div>
                {
                    result
                        ? <Table
                        result={result.hits}
                        onDismiss={this.onDismiss}
                        />
                        : null
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>Gime More</Button>
                </div>
            </div>
        );
    }
}

export default App;
