import axios from "axios";

function CSVModal({ onClose }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/leads/upload", formData);
    window.location.reload();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>CSV Upload</h3>

        <input type="file" onChange={handleFile} />

        <div style={{ marginTop: "10px" }}>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: "20px",
  width: "400px",
  borderRadius: "10px",
};

export default CSVModal;
