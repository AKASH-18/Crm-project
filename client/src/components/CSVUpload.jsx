import { useState } from "react";
import axios from "axios";

function CSVUpload({ refresh }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return alert("Select CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/leads/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("CSV uploaded successfully");
      setFile(null);
      refresh();
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
    </div>
  );
}

export default CSVUpload;
