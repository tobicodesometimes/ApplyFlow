const StatsBar = ({ applications }) => {
  const total = applications.length;

  const offers = applications.filter((a) => a.status === 'offer').length;
  const rejections = applications.filter((a) => a.status === 'rejected').length;

  const inProcess = applications.filter(
    (a) => a.status !== 'offer' && a.status !== 'rejected'
  ).length;

  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Process</div>
          <div className="stat-value">{inProcess}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Offers</div>
          <div className="stat-value">{offers}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Rejections</div>
          <div className="stat-value">{rejections}</div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;

