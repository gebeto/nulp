import * as React from 'react';


const withItemsFetchingOnMount = ({ endpoint }) => (Component) => class extends React.Component<any, any> {
	displayName = `withFetching(${Component.name})`;
	isUnmounted = false;

	state = {
		data: null,
		fetching: false,
		fetchingError: false,
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	componentDidMount() {
		this.setState(state => ({ ...state, fetching: true, fetchingError: false, data: null }));
		endpoint.getAll().then(response => {
			if (this.isUnmounted) return;
			this.setState(state => ({
				...state,
				fetching: false,
				fetchingError: false,
				data: response.items,
			}));
		}).catch(error => {
			if (this.isUnmounted) return;
			this.setState(state => ({
				...state,
				fetching: false,
				fetchingError: true,
				data: null,
			}));
		});
	}

	render() {
		return <Component {...this.state} {...this.props} />;
	}
};


export default withItemsFetchingOnMount;