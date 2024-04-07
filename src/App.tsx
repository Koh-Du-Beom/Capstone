
import './App.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import RoomSelectPage from './pages/RoomSelectPage';
import LoginPage from './pages/LoginPage';
import UserInfoLayout from './layouts/UserInfoLayout/UserInfoLayout';
import SignUpPage from './pages/SignUpPage';
import StartingPage from './pages/StartingPage';

const router = createBrowserRouter([
	{
		path: "/",
		element: <UserInfoLayout />,
		children: [
			{ index: true, element : <StartingPage/> },
			{ path: 'login', element: <LoginPage/>},
			{ 
				path: 'signUp', 
				element: <SignUpPage/>,
				children: [
					{ path: 'agreement', element: <SignUpPage/> }
				] 
			},
			

			{
				path: '/roomSelect',
				element: <RoomSelectPage/>
			}
		]
	},
	
])

function App() {

  return (
    <>
			<RouterProvider router={router} />
    </>
  )
}

export default App
