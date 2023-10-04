import { type RouteRecordRaw, type Router, createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: routes as Readonly<RouteRecordRaw[]>,
});

router.beforeEach(async (_to, _from, next) => {
  console.debug(_to, _from, next);
  next();
});

export default router;
