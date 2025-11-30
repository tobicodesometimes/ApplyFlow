import { useState } from 'react';
import { createApplication } from '../../api/applicationsApi.js';

const ApplicationForm = ({ onClose, onCreated }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [status, setStatus] = useState('applied');
  const [nextAction, setNextAction] = useState('');
  const [nextActionDate, setNextActionDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createApplication({
        company,
        role,
        jobLink,
        status,
        nextAction,
        nextActionDate: nextActionDate ? new Date(nextActionDate) : null,
        notes,
      });
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating application');
    }
  };

  return (
    <section style={{ marginTop: '1rem', border: '1px solid #ddd', padding: '1rem' }}>
      <h2>New Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company</label><br />
          <input value={company} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div>
          <label>Role</label><br />
          <input value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <div>
          <label>Job Link</label><br />
          <input value={jobLink} onChange={(e) => setJobLink(e.target.value)} />
        </div>
        <div>
          <label>Status</label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="applied">Applied</option>
            <option value="phone">Phone Screen</option>
            <option value="oa">Online Assessment</option>
            <option value="onsite">Onsite</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Next Action</label><br />
          <input value={nextAction} onChange={(e) => setNextAction(e.target.value)} />
        </div>
        <div>
          <label>Next Action Date</label><br />
          <input
            type="date"
            value={nextActionDate}
            onChange={(e) => setNextActionDate(e.target.value)}
          />
        </div>
        <div>
          <label>Notes</label><br />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Save</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '0.5rem' }}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default ApplicationForm;
