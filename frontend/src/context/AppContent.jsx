import { createContext, use, useEffect, useState } from "react";
import { supabase } from "./supabase-client";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const isLoggedIn = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    }
  
    
  );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

    const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

    const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Wrong Credentials");
    return data;
  };

    const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };


  const value = {
    isLoggedIn,
    user,
    register,
    login,
    logout,
    loading,
    showForm,
    setShowForm,
  };


  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
