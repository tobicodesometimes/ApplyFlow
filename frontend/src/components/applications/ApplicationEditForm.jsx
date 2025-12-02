import { useState } from 'react';
import { updateApplication } from '../../api/applicationsApi.js';

const ApplicationEditForm = ({ app, onClose, onUpdated }) => {
  const [company, setCompany] = useState(app.company || '');
  const [role, setRole] = useState(app.role || '');
  const [jobLink, setJobLink] = useState(app.jobLink || '');
  const [status, setStatus] = useState(app.status || 'applied');
  const [nextAction, setNextAction] = useState(app.nextAction || '');
  const [nextActionDate, setNextActionDate] = useState(() => {
    if (!app.nextActionDate) return '';
    const d = new Date(app.nextActionDate);
    return d.toISOString().slice(0, 10);
  });
  const [notes, setNotes] = useState(app.notes || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateApplication(app._id, {
        company,
        role,
        jobLink,
        status,
        nextAction,
        nextActionDate: nextActionDate ? new Date(nextActionDate) : null,
        notes,
      });

      if (onUpdated) onUpdated();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating application');
    }
  };

  return (
    <section className="section-card" style={{ marginTop: '1rem' }}>
      <h2 className="subheading">Edit Application</h2>
      <form onSubmit={handleSubmit} className="form-stack">
        <div className="form-field">
          <label>Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Job Link</label>
          <input
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="phone">Phone Screen</option>
            <option value="oa">Online Assessment</option>
            <option value="onsite">Onsite</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="form-field">
          <label>Next Action</label>
          <input
            value={nextAction}
            onChange={(e) => setNextAction(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Next Action Date</label>
          <input
            type="date"
            value={nextActionDate}
            onChange={(e) => setNextActionDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default ApplicationEditForm;

