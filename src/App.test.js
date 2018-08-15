import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import App, {Search, Button, Table} from './App';

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Correct snapshot tree', () => {
        const component = renderer.create(
            <App/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Search', () => {
    it('renders without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Search</Search>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Search test has been Passed', () => {
        const component = renderer.create(
            <Search>Search</Search>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('Button', () => {
    it('renders without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Gimme More</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Button test has been Passed', () => {
        const component = renderer.create(
            <Button>Gimme More</Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Table', () => {
    const props = {
        list: [
            {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
            {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'}
        ]
    };

    it('renders without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('shows two items in list', () => {
        const element = shallow(
            <Table { ...props } />
        );
        expect(element.find('.table-row').length).toBe(2);
    });

    test('Table test has been Passed', () => {
        const component = renderer.create(
            <Table {...props}/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
