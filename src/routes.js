import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";
import LandingPageView from "./views/LandingPageView";
import CorporateSignUpView from "./views/CorporateSignUpView";
import CallView from "./views/CallView";
import NewCallView from "./views/NewCallView";
import WaitingView from "./views/WaitingView";
import EditProfileView from "./views/EditProfileView";
import ConfirmView from "./views/ConfirmView";

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
    path: "/confirm/:id/:domain?",
    component: ConfirmView,
  },
  {
    path: "/movie/:id",
    component: MovieDetailsView,
  },
  // {
  //     path: "/call",
  //     component: CallView,
  // },
  {
      path: "/call/:id",
      component: CallView,
  },
  {
      path: "/wait/:page",
      component: WaitingView,
  },
  {
      path: "/wait",
      component: WaitingView,
  },
  {
      path: "/nc",
      component: NewCallView,
  },
];

export default routes;
