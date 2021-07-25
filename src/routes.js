import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import TryOutView from "./views/TryOutView";
import LandingPageView from "./views/LandingPageView";
import EventView from "./views/EventView";
import CallView from "./views/CallView";
import WaitingView from "./views/WaitingView";
import LobbyView from "./views/LobbyView";
import EditProfileView from "./views/EditProfileView";
import ConfirmView from "./views/ConfirmView";
import GroupCallView from "./views/GroupCallView";
import MessengerView from "./views/MessengerView";

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
    path: "/login",
    component: UserLoginView,
  },
  {
    path: "/register",
    component: SignUpView,
  },
  {
    path: "/tryout",
    component: TryOutView,
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
  {
    path: "/lobby/:id",
    component: LobbyView,
  },
  {
    path: "/messenger",
    component: MessengerView,
  },
];

export default routes;
