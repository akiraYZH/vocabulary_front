//生成nav导航栏需要的json
const navFilter = (routes) => {
  const _routes = JSON.parse(JSON.stringify(routes));
  return _routes.filter((route) => {
    if (route.meta ? route.meta.nav : false) {
      if (route.routes ? route.routes.length : false) {
        route.routes = navFilter(route.routes);
        !route.routes.length && delete route.routes;
      }
      return route;
    }
    return;
  });
};

export default navFilter;
