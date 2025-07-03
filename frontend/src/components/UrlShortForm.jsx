import { useContext, useState } from "react";
import { AppContent } from "../context/AppContent";
import { supabase } from "../context/supabase-client";
import { nanoid } from "nanoid";
import {useNavigate} from 'react-router'

const UrlShortForm = () => {
  const [error, setError] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const { user, setShowForm } = useContext(AppContent);
  const navigate = useNavigate();

  const handleShort = async (e) => {
    e.preventDefault;

    const shortCode = customCode.trim() || nanoid(7);

    const { error } = await supabase.from("urls").insert({
      longUrl: longUrl,
      shortCode: shortCode,
      user_id: user.id,
    });

    if (error) {
      alert("Failed to shorten link");
    } else {
      alert("Link shortened successfully!");
      setLongUrl("");
      setCustomCode("");
      setShowForm(false);
      navigate("/dashboard")
    }
  };
  return (
    <div className="lg:w-md">
      <form className="flex flex-col gap-4 items-center" action={handleShort}>
        <div className="grid grid-cols-2">
          <label>Long URL</label>
          <input
            type="url"
            required
            className="border-2 rounded-sm p-2"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2">
          <label>Custom Code</label>
          <input
            type="text"
            className="border-2 rounded-sm p-2"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <div>
          <input
            type="submit"
            value="Shorten Link"
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md"
          />
        </div>
      </form>
    </div>
  );
};

export default UrlShortForm;
