import { createBrowserRouter, RouterProvider } from 'react-router'
import UserLayout from '../layout/UserLayout'
import ProtectedRoutes from '../components/ProtectedRoutes'
import HomeLayout from '../layout/HomeLayout'
import HomePage from '../pages/HomePage'
import MessagePage from '../pages/MessagePage'
import DashboardPage from '../pages/DashboardPage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import JobPage from '../pages/JobPage'
import ServicesPage from '../pages/ServicesPage'
import ApplicantsPage from '../pages/ApplicantsPage'
import CreateJobPage from '../pages/CreateJobPage'
import JobDetailsPage from '../pages/jobDetailsPage'
import ApplicantDetailsPage from '../pages/ApplicantDetailsPage'
import JobPostPage from '../pages/JobPostPage'
import MessagesLayout from '../layout/MessagesLayout'

const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />
    },
    {
      path: "/home",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <HomeLayout />,
          children: [
            {
              path: "",
              element: <HomePage />
            },
            {
              path: "dashboard",
              element: <DashboardPage />
            },
            {
              path: "profile",
              element: <ProfilePage />
            },
            {
              path: "job",
              element: <JobPage />
            },
            {
              path: "create-job",
              element: <CreateJobPage />
            },
            {
              path: "job-post",
              element: <JobPostPage />
            },
            {
              path: "applicants",
              element: <ApplicantsPage />
            },
            {
              path: "applicant/details/:id",
              element: <ApplicantDetailsPage />
            },
            {
              path: "jobs/details/:id",
              element: <JobDetailsPage />
            },
            {
              path: "services",
              element: <ServicesPage />
            },
            {
              path: "settings",
              element: <SettingsPage />
            },
            {
              path: "messages",
              element: <MessagesLayout />,
              children: [{
                path: "chat/:id",
                element: <MessagePage />
              }]
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter;
