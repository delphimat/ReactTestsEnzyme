import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        // our component just go rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth) {
                console.log('I NEED TO LEAVE!!!');
                this.props.history.push('/');
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }


    function mapStateToProps(state) {
        return { auth: state.auth};
    }

    return connect(mapStateToProps)(ComposedComponent);
};
