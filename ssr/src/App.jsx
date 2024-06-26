import React, { useState, useEffect } from 'react'
import Util from '@/components/page/util/util.jsx'

const getData = async () => {
  return await import('../testData2.js').then(res => res.default)
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Page: null
    }
  }
  componentDidMount() {
    this.init()
  }

  async init() {
    const data = await getData();
    console.log(this)
    const res = await Util.loadComponent('html', data);
    console.log(res.props.children[1])
    // const res = await Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', data);
    this.setState({
      Page: res.props.children[1]
    })
  }

  render() {
    const { Page } = this.state;
    if (Page) {
      return Page
    }
    return null
  }
}
