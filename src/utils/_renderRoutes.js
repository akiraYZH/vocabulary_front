import React from "react";
import { renderRoutes } from "react-router-config";
//生成所有路由
const _renderRoutes = (routes, arr = [], count = 0) => {
  const Routes = <div key={"$" + count}>{renderRoutes(routes)}</div>;

  arr.push(Routes);

  routes.forEach((route) => {
    if (route.routes) {
      _renderRoutes(route.routes, arr, ++count);
    }
  });

  return arr;
};
export default _renderRoutes;
