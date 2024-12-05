import { useRoutes } from "react-router-dom";
// Common Pages.
import HomePage from "./pages/home/HomePage";
import Navigation from "./components/Navigation/Navigation";
import SubscribersPage from "./pages/subscribers/SubscribersPage";
import SubscriberView from "./components/Subscribers/SubscriberView";
import SubscribersBackofficePage from "./pages/backoffice/subscribers/SubscribersPage";

// Application
const App = () => {

  // Setting Up Routes
  const routes = useRoutes(
            [

            {
              path: "/",
              element : <HomePage></HomePage>
            },
            {
              path: "/subscribers",
              element : <SubscribersPage></SubscribersPage>
            },
            {
              path: "/subscribers/:id",
              element : <SubscriberView></SubscriberView>
            },
            {
              path: "/backoffice/subscribers",
              element : <SubscribersBackofficePage></SubscribersBackofficePage>
            },
            {
              path: "/users",
              element : <div>USERS</div>
            },
            {
              path: "*",
              element : <div>NOT FOUND</div>
            },

          ]

  );

  return <>
    <div>
        <Navigation></Navigation>
        <div>
            {routes}
        </div>
       {/* GLOBAL FOOTER */}
    </div>
  </>;

}

export default App;
