import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";
import LandingPageView from "./views/LandingPageView";
import CorporateSignUpView from "./views/CorporateSignUpView";
import CallView from "./views/CallView";

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
        path: "/movie/:id",
        component: MovieDetailsView,
    },
    {
        path: "/meeting",
        component: MeetingView,
    },
    {
        path: "/call",
        component: CallView,
    },
];

export default routes;
