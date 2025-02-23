import React from "react";
import Pagecomponent from "../components/Pagecomponent.js";

/**
 * Created By brand On 
 */
export default class Pagecontainer extends React.Component {
  constructor(props) {
    super();
    let _totalPage = props.data.totalPages;
    let _page = props.data.page;
    this.state = {
      dataList: [],
      pageConfig: {
        totalPage: _totalPage,
        _pagenum: _page
      }
    };
    this.getCurrentPage = this.getCurrentPage.bind(props.controler);
  }

  componentWillReceiveProps(newProps) {
    let _totalPage = newProps.data.totalPages;
    let _page = newProps.data.page;

    let _state = this.state || {};

    if (_totalPage || _page) {
      this.setState({
        pageConfig: {
          totalPage: _totalPage,
          _pagenum: _page
        }
      });
    }
  }

  getCurrentPage(currentPage) {
    let _state = this.state || {};

    _state.page = currentPage;
    this.getResourceList(_state).then(data => {
      if (data) {
        this.setState({
          page: currentPage,
          [`${_state.resourceType}List`]: data.list
        });
      }
    });
  }

  render() {
    return React.createElement("div", null, React.createElement("div", null, this.state.dataList), React.createElement(Pagecomponent, {
      pageConfig: this.state.pageConfig,
      pageCallbackFn: this.getCurrentPage
    }));
  }

}

