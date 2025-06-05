
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { CreateEmployee, } from './pages/create.employee/CreateEmployee'
// import { Login } from './pages/login/Login'
import NotFound from './pages/notfound/Notfound';
import { Layout } from './containers/home.layout/HomeLayout';
import { EmployeeList } from './pages/employee.list/EmployeeList';
import { EmployeeDetails } from './pages/employee.details/EmployeeDetails';
import { EditEmployee } from './pages/edit.employee/EditEmployee';
import React from 'react';
import { lazy,Suspense } from 'react';

const isLoggedIn = () => {
  const token = localStorage.getItem("isLoggedIn")
  return token === "true";
}

// const ProtectedRouteChecker =  ({children}: {children: React.ReactNode}) => {
//   const loggedIn = isLoggedIn();
  
//   if(loggedIn) return children;
//   return <Navigate to="/login"/>
// }

const PublicRouteChecker =  ({children}: {children: React.ReactNode}) => {
  const loggedIn = isLoggedIn();
  
  if(loggedIn) return <Navigate to="/"/>;
  return children
}

const Login = lazy(() => import("./pages/login/Login"))
const router = createBrowserRouter ([
  {
    path: "/",
    element: <Navigate to="/employees" />,
  },
  {
    path: "/login",
    element: <PublicRouteChecker><Suspense fallback={<div>Loading</div>}> <Login /></Suspense>  </PublicRouteChecker> ,
  },
  {
    path: "/employees",
    element: <Layout/>,
    children: [
      { index: true, element: <EmployeeList />},
      { path: "create", element: <CreateEmployee/>},
      { path: "details/:id", element: <EmployeeDetails/>},
      { path: "edit/:id", element: <EditEmployee/>}
    ],
    errorElement:<NotFound />

  },
  {
    path: '*',
    element: <NotFound />
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />  
    </>
  )
}

export default App
