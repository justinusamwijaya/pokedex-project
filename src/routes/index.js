import { 
    Home,
    Detail
} from "../pages";
// import { withAuthentication, lazyLoad } from "../views/enhancers";

const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
        default: true
    },
    {
        path: "/:id",
        component: Detail
    }
];

export default routes;
