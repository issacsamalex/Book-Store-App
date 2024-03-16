import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Home/WelcomePage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import BookDescription from "./pages/BookDescription/BookDescription";
import Profile from "./pages/Profile/Profile";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";


import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import BookDescriptionPublic from "./pages/BookDescription/BookDescrptionPublic";


function App() {

  const { loading } = useSelector((state) => state.loaders);
  
  return (
    <>
      {loading && <Loader/>}
      <BrowserRouter>
        <Helmet>
          <title>BookLendr</title>
          <meta name="description" content="Unlock the world of literature with our book lending app. Access an extensive library of titles, conveniently borrow and return books with just a few taps. Whether you're an avid reader or exploring new interests, find your next adventure here. Start borrowing today!" />
          <meta name="keywords" content="Book lending, Borrow books, Library app, Reading community, Online book rental, Digital library, Book sharing, Explore new reads, Online lending library" />
        </Helmet>
        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/book/:id" element={<ProtectedRoute><BookDescription/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/book/public/:id" element={<BookDescriptionPublic/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
