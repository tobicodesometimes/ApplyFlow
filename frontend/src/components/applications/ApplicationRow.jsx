const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};

const getStatusStyle = (status) => {
  const base = {
    display: "inline-block",
    padding: "0.15rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.8rem",
    textTransform: "capitalize",
  };

  switch (status) {
    case "applied":
      return { ...base, backgroundColor: "#e0f2ff", color: "#074b8a" };
    case "phone":
      return { ...base, backgroundColor: "#e0ffe5", color: "#0b6b2b" };
    case "oa":
      return { ...base, backgroundColor: "#fff4d6", color: "#8a5b07" };
    case "onsite":
      return { ...base, backgroundColor: "#e6e0ff", color: "#3f1f8a" };
    case "offer":
      return { ...base, backgroundColor: "#d9ffe8", color: "#056839" };
    case "rejected":
      return { ...base, backgroundColor: "#ffe0e0", color: "#8a0707" };
    default:
      return { ...base, backgroundColor: "#f1f1f1", color: "#333" };
  }
};

const getCategoryStyle = (category) => {
  const base = {
    display: "inline-block",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.78rem",
    fontWeight: 500,
    textTransform: "capitalize",
  };

  switch (category) {
    case "dream":
      return { ...base, backgroundColor: "#ede9fe", color: "#4c1d95" };
    case "referral":
      return { ...base, backgroundColor: "#dcfce7", color: "#166534" };
    case "cold":
    default:
      return { ...base, backgroundColor: "#f3f4f6", color: "#374151" };
  }
};

const ApplicationRow = ({ app, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{app.company}</td>
      <td>{app.role}</td>
      <td>
        <span style={getStatusStyle(app.status)}>{app.status}</span>
      </td>
      <td>
        <span style={getCategoryStyle(app.category)}>
          {app.category || "cold"}
        </span>
      </td>
      <td>{formatDate(app.appliedDate)}</td>
      <td>{app.nextAction || "-"}</td>
      <td>{formatDate(app.nextActionDate)}</td>
      <td>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit && onEdit(app)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete && onDelete(app._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ApplicationRow;
