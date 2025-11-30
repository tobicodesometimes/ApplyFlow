// src/components/applications/ApplicationTable.jsx
import ApplicationRow from './ApplicationRow.jsx';

const ApplicationTable = ({ applications }) => {
  if (!applications.length) {
    return <p>No applications yet. Add your first one!</p>;
  }

  return (
    <table
      style={{
        width: '100%',
        marginTop: '1rem',
        borderCollapse: 'collapse'
      }}
    >
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Status</th>
          <th>Applied</th>
          <th>Next Action</th>
          <th>Next Date</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <ApplicationRow key={app._id} app={app} />
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;

