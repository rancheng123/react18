import React, { useState, useEffect } from 'react'
import Util from '@/components/page/util/util.jsx'

const getData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  await import('../testData').then(res => res.default)
=======
  return await import('../testData.js').then(res => res.default)
>>>>>>> f84b245 (RN-000: test ssr)
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
<<<<<<< HEAD
  })
>>>>>>> 470503b (RN-000: 测试服务)
=======
  }, [])
>>>>>>> f84b245 (RN-000: test ssr)
  if (!Page) {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
<<<<<<< HEAD
<<<<<<< HEAD
  return 'hello'
=======

>>>>>>> 470503b (RN-000: 测试服务)
=======
  return 'hello'
>>>>>>> f84b245 (RN-000: test ssr)
  return <Page />
}