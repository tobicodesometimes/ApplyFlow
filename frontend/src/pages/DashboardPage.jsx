import { useEffect, useState } from 'react';
import { fetchApplications } from '../api/applicationsApi.js';
import ApplicationTable from '../components/applications/ApplicationTable.jsx';
import TodayPanel from '../components/applications/TodayPanel.jsx';
import ApplicationForm from '../components/applications/ApplicationForm.jsx';
import ApplicationEditForm from '../components/applications/ApplicationEditForm.jsx';
import StatsBar from '../components/applications/StatsBar.jsx';

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  const loadApplications = async () => {
    try {
      const { data } = await fetchApplications({
        status: statusFilter || undefined,
        search: search || undefined,
      });

      const sorted = [...data].sort((a, b) => {
        const aNext = a.nextActionDate ? new Date(a.nextActionDate) : null;
        const bNext = b.nextActionDate ? new Date(b.nextActionDate) : null;

        if (aNext && bNext) return aNext - bNext;
        if (aNext && !bNext) return -1;
        if (!aNext && bNext) return 1;

        const aApplied = a.appliedDate ? new Date(a.appliedDate) : null;
        const bApplied = b.appliedDate ? new Date(b.appliedDate) : null;

        if (aApplied && bApplied) return aApplied - bApplied;

        return 0;
      });

      console.log('Loaded applications (sorted):', sorted);
      setApplications(sorted);
    } catch (err) {
      console.error('Error loading applications', err);
    }
  };

  useEffect(() => {
    loadApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="shell">
      <h1 className="page-title">Dashboard</h1>

      <StatsBar applications={applications} />

      <section className="section-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <input
            placeholder="Search by company or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', marginRight: '0.5rem' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', marginRight: '0.5rem' }}
          >
            <option value="">All statuses</option>
            <option value="applied">Applied</option>
            <option value="phone">Phone Screen</option>
            <option value="oa">Online Assessment</option>
            <option value="onsite">Onsite</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <span className="btn-row">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={loadApplications}
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add Application
            </button>
          </span>
        </div>

        <TodayPanel applications={applications} />

        <div className="data-table-wrapper">
          <ApplicationTable
            applications={applications}
            onEdit={(app) => setEditingApp(app)}
          />
        </div>
      </section>

      {showForm && (
        <ApplicationForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            loadApplications();
          }}
        />
      )}

      {editingApp && (
        <ApplicationEditForm
          app={editingApp}
          onClose={() => setEditingApp(null)}
          onUpdated={() => {
            setEditingApp(null);
            loadApplications();
          }}
        />
      )}
    </main>
  );
};

export default DashboardPage;





