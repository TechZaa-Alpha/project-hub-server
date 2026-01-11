import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import userRoute from './app/modules/user/user.route';
import projectRoute from './app/modules/project/project.route';
import organizationRoute from './app/modules/organization/organization.route';


const appRouter = Router();

const moduleRoutes = [
    { path: "/organization", route: organizationRoute },
    { path: "/project", route: projectRoute },
    { path: '/auth', route: authRoute },
    { path: "/user", route: userRoute }


];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;