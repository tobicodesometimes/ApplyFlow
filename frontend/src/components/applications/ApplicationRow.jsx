// src/components/applications/ApplicationRow.jsx

const formatDate = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString();
};

const ApplicationRow = ({ app }) => {
  return (
    <tr>
      <td>{app.company}</td>
      <td>{app.role}</td>
      <td>{app.status}</td>
      <td>{formatDate(app.appliedDate)}</td>
      <td>{app.nextAction || '-'}</td>
      <td>{formatDate(app.nextActionDate)}</td>
    </tr>
  );
};

export default ApplicationRow;

