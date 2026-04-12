import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import { useEffect, useState } from "react";
import "../../styles/Employee/leads.css";
import API from "../../api";

function EmployeeLeads() {
  const [leads, setLeads] = useState([]);
  const [popup, setPopup] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data");
  }

  // ✅ FETCH LEADS
  const fetchLeads = async () => {
    try {
      if (!user?._id) return;

      const res = await API.get(`/api/leads/my/${user._id}`);
      setLeads(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ UPDATE LEAD
  const updateLead = async (id, data) => {
    try {
      await API.put(`/api/leads/${id}`, data);
      await fetchLeads();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  return (
    <EmployeeLayout title="Leads">
      <div className="lead-page">
        <input className="search" placeholder="Search" />

        <div className="lead-container">
          {leads.map((lead) => (
            <div className="lead-item" key={lead._id}>
              <div className="lead-left">
                <div className="lead-info">
                  <h4>{lead.name}</h4>
                  <p>{lead.email}</p>
                </div>
                <div className="lead-date">
                  <span>{lead.date}</span>
                </div>
              </div>

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

                <div className="lead-actions">
                  <button
                    onClick={() => setPopup({ type: "type", id: lead._id })}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => setPopup({ type: "date", id: lead._id })}
                  >
                    ⏰
                  </button>

                  <button
                    onClick={() => setPopup({ type: "status", id: lead._id })}
                  >
                    ⬇️
                  </button>
                </div>
              </div>

              {popup?.id === lead._id && (
                <div className="popup">
                  {popup.type === "type" && (
                    <>
                      <h4>Type</h4>
                      <div className="type-options">
                        {["Hot", "Warm", "Cold"].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              updateLead(lead._id, { type: t });
                              setPopup(null);
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

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

                          setPopup(null);
                        }}
                      >
                        Save
                      </button>
                    </>
                  )}

                  {popup.type === "status" && (
                    <>
                      <h4>Lead Status</h4>

                      <button disabled>Ongoing</button>

                      <button
                        onClick={() => {
                          if (lead.scheduledDate) {
                            alert("Lead cannot be closed");
                            return;
                          }

                          updateLead(lead._id, { status: "Closed" });
                          setPopup(null);
                        }}
                      >
                        Closed
                      </button>

                      <button onClick={() => setPopup(null)}>Cancel</button>
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