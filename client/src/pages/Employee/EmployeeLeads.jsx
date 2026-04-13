import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import { useEffect, useState } from "react";
import "../../styles/Employee/leads.css";
import API from "../../api";
import { typeicon, status, dateicon } from "../../assets/employee/images";

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

  const fetchLeads = async () => {
    const res = await API.get(`/leads/my/${user._id}`);
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLead = async (id, data) => {
    await API.put(`/leads/${id}`, data);
    fetchLeads();
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
                  {/* TYPE */}
                  <div className="action-wrapper">
                    <button
                      onClick={() => setPopup({ type: "type", id: lead._id })}
                    >
                      <img src={typeicon} alt="type" />
                    </button>

                    {popup?.id === lead._id && popup.type === "type" && (
                      <div className="popup popup-type">
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
                      </div>
                    )}
                  </div>

                  {/* DATE */}
                  <div className="action-wrapper">
                    <button
                      onClick={() => setPopup({ type: "date", id: lead._id })}
                    >
                      <img src={dateicon} alt="" />
                    </button>

                    {popup?.id === lead._id && popup.type === "date" && (
                      <div className="popup popup-date">
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
                      </div>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="action-wrapper">
                    <button
                      onClick={() => setPopup({ type: "status", id: lead._id })}
                    >
                      <img src={status} alt="" />
                    </button>

                    {popup?.id === lead._id && popup.type === "status" && (
                      <div className="popup popup-status">
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeLeads;
