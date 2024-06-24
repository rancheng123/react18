import asyncComponent from './anyscComponent.jsx';

const Root = asyncComponent(() => import('./root.jsx'))
const ErrorPage = asyncComponent(() => import('../error-page.jsx'))

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]

export default routerConfig;