import React, { useEffect, useState } from "react";
import { reportAPI } from "../../utils/api";
import ReportForm from "./ReportForm";
import ReportStats from "./ReportStats";
import ReportsList from "./ReportsList";

const MedicalReportForm = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);

  const [loadingReports, setLoadingReports] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");

  const fetchReports = async () => {
    setLoadingReports(true);
    const { data } = await reportAPI.getReports();
    setLoadingReports(false);
    if (data?.reports) setReports(data.reports);
  };

  const fetchStats = async () => {
    const { data } = await reportAPI.getReportStats();
    if (data?.stats) setStats(data.stats);
  };

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  const createReport = async (payload, resetForm) => {
    setSubmitting(true);
    setMessage("");
    const { data, error } = await reportAPI.createReport(payload);
    setSubmitting(false);

    if (data?.report) {
      setMessage("Medical report added successfully!");
      resetForm();
      fetchReports();
      fetchStats();
    } else {
      setMessage(error || "Something went wrong");
    }
  };

  const deleteReport = async (id) => {
    setDeletingId(id);
    await reportAPI.deleteReport(id);
    setDeletingId(null);
    fetchReports();
    fetchStats();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Medical Reports</h2>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.includes("Error")
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReportForm onSubmit={createReport} submitting={submitting} />
        <ReportStats stats={stats} />
      </div>

      <ReportsList
        reports={reports}
        loading={loadingReports}
        deletingId={deletingId}
        onDelete={deleteReport}
      />
    </div>
  );
};

export default MedicalReportForm;
