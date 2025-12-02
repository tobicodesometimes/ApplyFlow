import ApplicationRow from './ApplicationRow.jsx';

const ApplicationTable = ({ applications, onEdit, onDelete }) => {
  if (!applications.length) {
    return <p className="text-muted">No applications yet. Add your first one!</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Status</th>
          <th>Applied</th>
          <th>Next Action</th>
          <th>Next Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <ApplicationRow
            key={app._id}
            app={app}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;



