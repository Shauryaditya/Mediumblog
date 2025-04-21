import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { Blog } from './pages/Blog.tsx'
import { Blogs } from './pages/Blogs.tsx'
import { Publish } from './pages/Publish.tsx'

// Mock authentication function
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem('jwtToken') !== null;
};

// PrivateRoute component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/blog/:id"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <Blogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/publish"
            element={
              <PrivateRoute>
                <Publish />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Blogs />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
