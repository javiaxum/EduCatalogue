import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../../app/layout/App";
import ErrorPage from "../errors/ErrorPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import EmailConfirmed from "../identity/EmailConfirmed";
import PasswordConfirmed from "../identity/PasswordConfirmed";
import PasswordResetForm from "../identity/PasswordResetForm";
import InstitutionComparisonBoard from "../Institutions/comparison/InstitutionComparisonBoard";
import InstitutionDashboard from "../Institutions/dashboard/InstitutionDashboard";
import InstitutionDetails from "../Institutions/details/InstitutionDetails";
import InstitutionForm from "../Institutions/form/InstitutionForm";
import ProfilePage from "../profiles/ProfilePage";
import SpecialtyDetails from "../Specialties/details/SpecialtyDetails";
import SpecialtyForm from "../Specialties/form/SpecialtyForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'passwordResetForm/:token', element: <PasswordResetForm /> },
            { path: 'passwordConfirmed', element: <PasswordConfirmed /> },
            { path: 'emailConfirmed', element: <EmailConfirmed /> },
            { path: 'institutions', element: <InstitutionDashboard /> },
            { path: 'institutions/comparison', element: <></> },
            { path: 'institutions/:id', element: <InstitutionDetails /> },
            { path: 'createInstitution', element: <InstitutionForm /> },
            { path: 'manage/:id', element: <InstitutionForm /> },
            { path: 'manage/:id/createSpecialty', element: <SpecialtyForm /> },
            { path: 'manage/:id1/specialty/:id2', element: <SpecialtyForm /> },
            { path: 'specialties/:id', element: <SpecialtyDetails /> },
            { path: 'specialties/comparison', element: <></> },
            { path: 'profiles/:username', element: <ProfilePage /> },
            { path: 'errors', element: <ErrorPage /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
];

export const router = createBrowserRouter(routes);