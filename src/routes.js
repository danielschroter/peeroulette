import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";
import LandingPageView from "./views/LandingPageView";
import CorporateSignUpView from "./views/CorporateSignUpView";
import EditProfileViewOld from "./views/EditProfileView";
import EditProfileView from "./views/EditProfileView";

// routes within the movie database example app
// used for routing

const routes = [
    {
        path: "/",
        component: LandingPageView,
        exact: true,
    },
    {
        path: "/corporate",
        component: CorporateSignUpView,
        exact: true,
    },
    {
        path: "/movies",
        component: MovieListView,
        exact: true,
    },
    {
        path: "/login",
        component: UserLoginView,
    },
    {
        path: "/register",
        component: SignUpView,
    },
    {
        path: "/edit",
        component: EditProfileView,
        exact: true,
    },
    {
        path: "/movie/:id",
        component: MovieDetailsView,
    },
];

export default routes;
