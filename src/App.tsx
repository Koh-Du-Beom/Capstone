
import './App.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import RoomSelectPage from './pages/RoomSelectPage';
import LoginPage from './pages/LoginPage';
import UserInfoLayout from './layouts/UserInfoLayout';
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([
	{
		path: "/",
		element: <UserInfoLayout />,
		children: [
			{ path: '/login', element: <LoginPage/>},
			{ path: '/signUp', element: <SignUpPage/> },
			
		]
	},
	{
		path: '/roomSelect',
		element: <RoomSelectPage/>
	}
])

function App() {
  

  return (
    <>
			<RouterProvider router={router} />
    </>
  )
}

export default App
