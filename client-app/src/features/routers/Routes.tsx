import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../../app/layout/App";
import ErrorPage from "../errors/ErrorPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import LoginForm from "../identity/LoginForm";
import InstitutionDashboard from "../Institutions/dashboard/InstitutionDashboard";
import InstitutionDetails from "../Institutions/details/InstitutionDetails";
import InstitutionForm from "../Institutions/form/InstitutionForm";
import SpecialtyForm from "../Specialties/form/SpecialtyForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'institutions', element: <InstitutionDashboard /> },
            { path: 'institutions/:id', element: <InstitutionDetails /> },
            { path: 'createInstitution', element: <InstitutionForm /> },
            { path: 'manage/:id', element: <InstitutionForm /> },
            { path: 'createSpecialty', element: <SpecialtyForm /> },
            { path: 'errors', element: <ErrorPage /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
];

export const router = createBrowserRouter(routes);