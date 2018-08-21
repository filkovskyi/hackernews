import React from 'react';

const Loading = () => <div><i class="fas fa-spinner"></i> Loading ...</div>;

const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading
        ? <Loading/>
        : <Component {...rest}/>;

export default withLoading;
