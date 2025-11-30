// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { fetchApplications } from '../api/applicationsApi.js';
import ApplicationTable from '../components/applications/ApplicationTable.jsx';
import TodayPanel from '../components/applications/TodayPanel.jsx';
import ApplicationForm from '../components/applications/ApplicationForm.jsx';

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const loadApplications = async () => {
    try {
      const { data } = await fetchApplications({
        status: statusFilter || undefined,
        search: search || undefined,
      });
      console.log('Loaded applications:', data);
      setApplications(data);
    } catch (err) {
      console.error('Error loading applications', err);
    }
  };

  // Load once on mount
  useEffect(() => {
    loadApplications();
    // We intentionally only want this to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <section style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Search by company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="applied">Applied</option>
          <option value="phone">Phone Screen</option>
          <option value="oa">Online Assessment</option>
          <option value="onsite">Onsite</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        {/* Explicitly re-load when the user clicks Apply */}
        <button onClick={loadApplications}>Apply Filters</button>
        <button onClick={() => setShowForm(true)}>Add Application</button>
      </section>

      <TodayPanel applications={applications} />

      <ApplicationTable applications={applications} />

      {showForm && (
        <ApplicationForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            // Re-load after creating a new application
            loadApplications();
          }}
        />
      )}
    </main>
  );
};

export default DashboardPage;



