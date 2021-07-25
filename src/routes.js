import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";
import LandingPageView from "./views/LandingPageView";
import EventView from "./views/EventView";
import CallView from "./views/CallView";
import WaitingView from "./views/WaitingView";
import EditProfileView from "./views/EditProfileView";
import ConfirmView from "./views/ConfirmView";
import GroupCallView from "./views/GroupCallView";

// routes within the movie database example app
// used for routing

const routes = [
  {
    path: "/",
    component: LandingPageView,
    exact: true,
  },
  {
    path: "/events",
    component: EventView,
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
    path: "/group/:id",
    component: GroupCallView,
  },
  {
      path: "/wait/:page",
      component: WaitingView,
  },
  {
      path: "/wait",
      component: WaitingView,
  },
];

export default routes;
