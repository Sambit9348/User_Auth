import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/', // Default route for the login page
    element: <div><Login /></div>
  },
  {
    path: '/register', // Route for the registration page
    element: <div><Register /></div>
  }
]);

function App() {
  return (
    <div>
      {/* Provide the router to the application */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
