import React, { useState, useEffect } from 'react'
import Util from '@/components/page/util/util.jsx'

const getData = async () => {
  return await import('../testData.js').then(res => res.default)
};

export default function App() {
  const [Page, setPage] = useState(false);
  useEffect(async () => {
    const data = await getData();
    console.log(data)
    const res = await Util.loadComponent('html', data);
    // const res = await Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', data);
    console.log(res, '====')
    setPage(res);
  }, [])
  if (!Page) {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
  return 'hello'
  return <Page />
}