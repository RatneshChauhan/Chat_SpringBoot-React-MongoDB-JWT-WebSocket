import React from 'react';
import Moment from 'react-moment';

export default class TimeSince extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {dt} = this.props
        return (
            <Moment fromNow>{dt}</Moment>
        );
    }
}