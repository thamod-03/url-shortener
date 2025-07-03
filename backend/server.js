import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  console.log("Received shortCode:", shortCode);

  const { data, error } = await supabase
    .from("urls")
    .select("longUrl, clicks")
    .eq("shortCode", shortCode)
    .maybeSingle();

  console.log("Supabase data:", data);
  console.log("Supabase error:", error);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).send("Database error");
  }

  if (!data) {
    return res.status(404).send("Short link not found");
  }

  await supabase
    .from("urls")
    .update({ clicks: data.clicks + 1 })
    .eq("shortCode", shortCode);

  res.redirect(data.longUrl);
});

app.listen(port, () => {
  console.log(`Shortener backend running on http://localhost:${port}`);
});
