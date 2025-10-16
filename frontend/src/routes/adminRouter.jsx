import DashboardPage from "../pages/dashboard/dashboardPage";
import Groups from "../pages/group/group";
import SignIn from "../pages/Auth/signIn/signIn";
import SignUp from "../pages/Auth/signUp/signUp";
import SubjectsPage from "../pages/subjects/subjects";

export const ProtectedPages = [
    {
        path: "/",
        title: "Dashboard",
        element: <DashboardPage />,
    },
    {
        path: "/group",
        title: "Groups",
        element: <Groups />,
    },
    {
        path: "/subject",
        title: "Subjects",
        element: <SubjectsPage />,
    },
];

export const PublicPages = [
    {
        path: "/signin",
        title: "Sign In",
        element: <SignIn />,
    },
    {
        path: "/signup",
        title: "Sign Up",
        element: <SignUp />,
    },
];
