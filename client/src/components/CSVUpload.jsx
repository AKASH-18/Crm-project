import { useState } from "react";
import axios from "axios";

function CSVUpload({ refresh }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/leads/upload", formData);

      alert("Upload successful ✅");
      setFile(null);
      refresh(); // 🔥 important
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default CSVUpload;
