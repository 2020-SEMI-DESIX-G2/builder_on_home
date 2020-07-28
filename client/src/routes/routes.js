import LayoutBasic from '../layouts/LayoutBasic';

import Home from '../pages/Home';
import Services from '../pages/Services';
import Contracts from '../pages/Contracts';
import Error404 from '../pages/Error404'
import User from '../pages/User';

const routes = [
    {
        path: "/",
        layout: LayoutBasic,
        component: Home,
        exact: true,
    },
    {
        path: '/:username',
        layout: LayoutBasic,
        component: User,
        exact: true
    },
    {
        path: '/services',
        layout: LayoutBasic,
        component: Services,
        exact: true
    },
    {
        path: '/contracts',
        layout: LayoutBasic,
        component: Contracts,
        exact: true
    },
    {
        layout: LayoutBasic,
        component: Error404,
    },
];

export default routes;