import asyncComponent from './anyscComponent.jsx';

const Root = asyncComponent(() => import('./root.jsx'))
const ErrorPage = asyncComponent(() => import('../error-page.jsx'))
const Iframe = asyncComponent(() => import('../package/iframe'))

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Iframe />,
    errorElement: <ErrorPage />,
  }
]

export default routerConfig;