
import './App.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import RoomSelectPage from './pages/RoomSelectPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
	{
		path : '/',
		element: <LoginPage />,
	},
	{
		path: "/login",
		element: <LoginPage />
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
