import React, { Component } from 'react';
import { connect } from 'react-redux';

// 函数式组件连接redux
class MyComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            1111
        );
    }
}

// 连接Redux
const mapStateToProps = (state) => ({

});



export default connect(mapStateToProps)(MyComponent);