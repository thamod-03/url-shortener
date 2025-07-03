import { useContext, useEffect, useState } from "react";
import { AppContent } from "../context/AppContent";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { supabase } from "../context/supabase-client";

const DataTable = () => {
  const { user } = useContext(AppContent);
  const SHORT_BASE_URL = import.meta.env.VITE_SHORT_URL_BASE;

  const fetchingData = async (id) => {
    const { data, error } = await supabase
      .from("urls")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching URLs:", error);
      return [];
    }

    return data;
  };

  const [data, setData] = useState({ nodes: [] });

  const loadData = async () => {
    const result = await fetchingData(user.id);

    setData({
      nodes: Array.isArray(result)
        ? result.map((item) => ({
            ...item,
            id: item.id,
          }))
        : [],
    });
  };

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [data]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("urls").delete().eq("id", id); 

    if (error) {
      console.error("Delete failed:", error.message);
      alert("Error deleting the URL");
      return;
    }

    await loadData();
  };

  const theme = useTheme(getTheme());

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log("[Pagination]", action, state);
  }

  const COLUMNS = [
    {
      label: "Short URL",
      renderCell: (item) => (
        <a
          href={`${SHORT_BASE_URL}/${item.shortCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {item.shortCode}
        </a>
      ),
    },
    {
      label: "Original URL",
      renderCell: (item) => (
        <a
          href={item.longUrl}
          target="_blank"
          className="truncate max-w-[200px] block"
        >
          {item.longUrl}
        </a>
      ),
    },
    {
      label: "Clicks",
      renderCell: (item) => item.clicks,
    },
    {
      label: "Created At",
      renderCell: (item) =>
        new Date(item.created_at.replace(/\.\d+/, "")).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    },
    {
      label: "Action",
      renderCell: (item) => (
        <button
          onClick={() => handleDelete(item.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        pagination={pagination}
      />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>
        <span>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md ml-2"
              key={`page-${index}`}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>{" "}
      </div>
    </div>
  );
};

export default DataTable;
