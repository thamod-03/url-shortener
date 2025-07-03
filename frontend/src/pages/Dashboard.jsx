import React, { useContext, useEffect, useState } from "react";
import { AppContent } from "../context/AppContent";
import { useNavigate } from "react-router";
import DataTable from "../components/DataTable";
import UrlShortForm from "../components/UrlShortForm";


const Dashboard = () => {
  const { user, showForm, setShowForm } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/");
  }, [user]);

  return (
    <div className="mx-8">
      <h1 className="text-center md:text-xl lg:text-2xl mb-8">Dashboard</h1>
      <div className="flex flex-row-reverse">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md "
        >
          Shorten a link
        </button>
      </div>
      <div className="mt-8">
        <DataTable />
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/50 bg-opacity-100">
          <div className="relative p-6 bg-white lg:w-lg shadow-[0px_0px_10px_0px] shadow-black/10 md:w-md sm:w-sm">
            <UrlShortForm />
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
