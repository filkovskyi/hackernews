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
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    setSearchTopStories(result) {
        const { hits, page } = result;
        const { searchKey, results } = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updateHits = [...oldHits, ...hits];

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updateHits, page}
            }
        })
    };

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm]
    }

    onDismiss(id) {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState(
            {
                results: {
                    ...results,
                    [searchKey]: {hits: updatedHits, page}}
            }
        );
    };

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    };

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({searchKey: searchTerm});
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }

        event.preventDefault();
    };

    fetchSearchTopStories(searchTerm, page = 0) {
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
        
        fetch(url)
            .then(response => response.json())
            .then(results => this.setSearchTopStories(results))
            .catch(error => error);
    };

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({ searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    render() {
        const {
            results,
            searchTerm,
            searchKey,
        } = this.state;

        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];

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
                    results
                        ? <Table
                            list={list}
                            onDismiss={this.onDismiss}
                        />
                        : null
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>Gime More</Button>
                </div>
            </div>
        );
    }
}

export default App;
