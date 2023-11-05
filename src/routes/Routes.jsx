import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Add_Job from "../components/Add_Job/Add_Job";
import JobDetails from "../components/JobDetails/JobDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add_job",
        element: <Add_Job />,
      },
      {
        path: "/job_deteails/:id",
        element: <JobDetails />,
      },
    ],
  },
]);

export default router;
