import DashboardPage from "../pages/dashboard/dashboardPage";
import SettingsPage from "../pages/settings";
import SignIn from "../pages/Auth/signIn/signIn";
import SignUp from "../pages/Auth/signUp/signUp";

export const ProtectedPages = [
    {
        path: "/",
        title: "Dashboard",
        element: <DashboardPage />,
    },
    {
        path: "/settings",
        title: "Settings",
        element: <SettingsPage />,
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
