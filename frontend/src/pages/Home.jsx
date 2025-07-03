import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { AppContent } from "../context/AppContent";

const Home = () => {
    const {user} = useContext(AppContent);

  return (
    <div className="min-h-full flex justify-center items-center flex-col py-40 text-center gap-8">
      <h1 className="lg:text-2xl md:text-xl">Shorten URLs. Track Easily.</h1>
      <p>Create short links and manage them from your personal dashboard.</p>
      <Link
        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md"
        to={user ? `/dashboard` : `register`}
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
