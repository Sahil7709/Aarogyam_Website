const ReportsList = ({ reports, loading, deletingId, onDelete }) => {
  if (loading) return <p className="mt-6">Loading reports...</p>;
  if (!reports.length) return <p className="mt-6">No reports found.</p>;

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {reports.map((r) => (
        <div key={r._id} className="bg-white p-5 border rounded-lg shadow">
          <h4 className="font-medium mb-1 capitalize">{r.category}</h4>
          <p className="text-sm text-gray-500 mb-3">
            {new Date(r.date).toLocaleDateString()}
          </p>

          <button
            onClick={() => onDelete(r._id)}
            disabled={deletingId === r._id}
            className={`w-full py-2 rounded-lg text-white
              ${deletingId === r._id
                ? "bg-red-400"
                : "bg-red-600 hover:bg-red-700"}
            `}
          >
            {deletingId === r._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReportsList;
