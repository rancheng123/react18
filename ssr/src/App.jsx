import React, { useState, useEffect } from 'react'
import Util from '@/components/page/util/util.jsx'

const getData = async () => {
  await import('../testData').then(res => res.default)
};

export default function App() {
  const [Page, setPage] = useState(null);
  useEffect(async () => {
    const data = await getData();
    const res = await Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', data);
    setPage(res);
  })
  if (!Page) {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }

  return <Page />
}