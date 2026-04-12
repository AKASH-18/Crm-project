import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import { useEffect, useState } from "react";
import "../../styles/Employee/leads.css";
import axios from "axios";

function EmployeeLeads() {
  const [leads, setLeads] = useState([]);
  const [popup, setPopup] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/leads/my/${user._id}`);
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ UPDATE LEAD
  const updateLead = async (id, data) => {
    try {
      console.log("SENDING:", data); // ✅ DEBUG

      await axios.put(`http://localhost:5000/leads/${id}`, data);

      await fetchLeads(); // 🔥 IMPORTANT (await)
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };
  return (
    <EmployeeLayout title="Leads">
      <div className="lead-page">
        {" "}
        {/* 🔍 SEARCH */}
        <input className="search" placeholder="Search" />
        {/* 📋 LEADS */}
        <div className="lead-container">
          {leads.map((lead) => (
            <div className="lead-item" key={lead._id}>
              {/* LEFT */}
              <div className="lead-left">
                <div className="lead-info">
                  <h4>{lead.name}</h4>
                  <p>{lead.email}</p>
                </div>
                <div className="lead-date">
                  <span>{lead.date}</span>
                </div>
              </div>

              {/* 🔵 STATUS CIRCLE */}
              <div className="right-card">
                <div
                  className={`status-circle ${
                    lead.type
                      ? lead.type.toLowerCase()
                      : lead.status.toLowerCase()
                  }`}
                >
                  {lead.status}
                </div>

                {/* 🔥 ACTION ICONS */}
                <div className="lead-actions">
                  {/* TYPE */}
                  <button
                    onClick={() => setPopup({ type: "type", id: lead._id })}
                  >
                    ✏️
                  </button>

                  {/* DATE */}
                  <button
                    onClick={() => setPopup({ type: "date", id: lead._id })}
                  >
                    ⏰
                  </button>

                  {/* STATUS */}
                  <button
                    onClick={() => setPopup({ type: "status", id: lead._id })}
                  >
                    ⬇️
                  </button>
                </div>
              </div>
              {/* 🔥 POPUPS */}
              {popup?.id === lead._id && (
                <div className="popup">
                  {/* TYPE */}
                  {popup.type === "type" && (
                    <>
                      <h4>Type</h4>

                      <div className="type-options">
                        <button
                          className="hot"
                          onClick={() => {
                            updateLead(lead._id, { type: "Hot" });
                            setPopup(null);
                          }}
                        >
                          Hot
                        </button>

                        <button
                          className="warm"
                          onClick={() => {
                            updateLead(lead._id, { type: "Warm" });
                            setPopup(null);
                          }}
                        >
                          Warm
                        </button>

                        <button
                          className="cold"
                          onClick={() => {
                            updateLead(lead._id, { type: "Cold" });
                            setPopup(null);
                          }}
                        >
                          Cold
                        </button>
                      </div>
                    </>
                  )}

                  {/* DATE */}
                  <div className="date-box">
                    {popup.type === "date" && (
                      <>
                        <h4>Date</h4>

                        <input
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                        />

                        <input
                          type="time"
                          onChange={(e) => setTime(e.target.value)}
                        />

                        <button
                          onClick={() => {
                            if (!date || !time) {
                              alert("Select date & time");
                              return;
                            }

                            updateLead(lead._id, {
                              scheduledDate: `${date} ${time}`,
                              type: "Scheduled",
                            });
                          }}
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                  {/* STATUS */}
                  {popup.type === "status" && (
                    <>
                      <h4>Lead Status</h4>

                      <button disabled>Ongoing</button>

                      <button
                        onClick={() => {
                          if (lead.scheduledDate) {
                            alert("Lead can not be closed");
                            return;
                          }

                          updateLead(lead._id, { status: "Closed" });
                          setPopup(null);
                        }}
                      >
                        Closed
                      </button>

                      <button onClick={() => setPopup(null)}>Save</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeLeads;
