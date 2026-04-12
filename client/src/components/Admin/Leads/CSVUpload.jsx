import { useState } from "react";
import axios from "axios";
import "../../../styles/admin/leads.css";

function CSVUpload({ onUploadSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  // 🔥 HANDLE FILE SELECT
  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  // 🔥 DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Select CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/leads/upload", formData);

    setShowModal(false);
    setFile(null);

    if (onUploadSuccess) onUploadSuccess();
  };

  return (
    <>
      {/* 🔥 BUTTON */}
      <button onClick={() => setShowModal(true)}>Add CSV</button>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            {/* HEADER */}
            <div className="modal-header">
              <h3>CSV Upload</h3>
              <span onClick={() => setShowModal(false)}>✕</span>
            </div>

            <p className="sub-text">Add your documents here</p>

            {/* 🔥 DRAG AREA */}
            <div
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <p>{file ? file.name : "Drag your file(s) to start uploading"}</p>

              <button type="button">Browse files</button>

              <input
                id="fileInput"
                type="file"
                accept=".csv"
                hidden
                onChange={handleFile}
              />
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="upload-btn" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CSVUpload;
