import React, {Component} from 'react';
import axios from 'axios';


import Search from './components/search';
import Table  from './components/table';
import Button from './components/button';

import  {
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    DEFAULT_HPP,
    DEFAULT_QUERY
} from './constants'

import './App.css';

const Loading = () => <div><i class="fas fa-spinner"></i> Loading ...</div>;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    };

    setSearchTopStories(result) {
        const {hits, page} = result;
        const {searchKey, results} = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updateHits = [...oldHits, ...hits];

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updateHits, page}
            },
            isLoading: false
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
                    [searchKey]: {hits: updatedHits, page}
                }
            }
        );
    };

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    };

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }

        event.preventDefault();
    };

    fetchSearchTopStories(searchTerm, page = 0) {
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
        this.setState({isLoading: true});

        axios(url)
            .then(result => this.setSearchTopStories(result.data))
            .catch(error => this.setState({error}));
    };

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    render() {
        const {
            results,
            searchTerm,
            searchKey,
            error,
            isLoading
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

        if (error) {
            return alert(error);
        }

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
                    {
                        isLoading
                        ? <Loading/>
                        : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>Gimme More</Button>
                    }
                </div>
            </div>
        );
    }
}

export default App;

export {
    Button,
    Search,
    Table
};
