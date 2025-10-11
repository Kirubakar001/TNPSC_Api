import { Route, Routes } from "react-router-dom";
import Layout from "@/layouts/layout";
import { PublicPages, ProtectedPages } from "./adminRouter";
import PublicRoute from "./publicRoute";
import ProtectedRoute from "./protectedRoute";

export function Routers() {
    return (
        <Routes>
            {/* Public pages will follow here like SignIn, SignUp */}
            <Route element={<PublicRoute />}>
                {PublicPages.map(({ path, title, element }) => (
                    <Route
                        key={title}
                        path={path}
                        element={element}
                    />
                ))}
            </Route>

            {/* All main admin Protectedpages share the same layout */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    {ProtectedPages.map(({ path, title, element }) => (
                        <Route
                            key={title}
                            path={path}
                            element={element}
                        />
                    ))}
                </Route>
            </Route>
        </Routes>
    );
}
