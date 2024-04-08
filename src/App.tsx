
import './App.css'
import { createBrowserRouter, RouterProvider, Route, redirect } from 'react-router-dom';
import RoomSelectPage from './pages/RoomSelectPage';
import LoginPage from './pages/LoginPage';
import UserInfoLayout from './layouts/UserInfoLayout/UserInfoLayout';
import SignUpPage from './pages/SignUpPage';
import StartingPage from './pages/StartingPage';
import RoomReadyPage from './pages/RoomReadyPage';

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
			

			//다른 레이아웃에 놓아야할 것들

			{
				path: '/roomSelect',
				element: <RoomSelectPage/>
			},
			{
				path: 'roomReady',
				element: <RoomReadyPage/>
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

export default App;

