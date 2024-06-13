import * as React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import routerConfig from './router.config'
const router = createBrowserRouter(routerConfig);

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router