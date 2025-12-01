// src/components/applications/StatsBar.jsx

const StatsBar = ({ applications }) => {
  const total = applications.length;

  const offers = applications.filter((a) => a.status === 'offer').length;
  const rejections = applications.filter((a) => a.status === 'rejected').length;

  const inProcess = applications.filter(
    (a) => a.status !== 'offer' && a.status !== 'rejected'
  ).length;

  const cardStyle = {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
    textAlign: 'center',
  };

  const labelStyle = { fontSize: '0.8rem', textTransform: 'uppercase', color: '#666' };
  const valueStyle = { fontSize: '1.4rem', fontWeight: 'bold' };

  return (
    <section style={{ margin: '1rem 0 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={labelStyle}>Total</div>
          <div style={valueStyle}>{total}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>In Process</div>
          <div style={valueStyle}>{inProcess}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Offers</div>
          <div style={valueStyle}>{offers}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Rejections</div>
          <div style={valueStyle}>{rejections}</div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
