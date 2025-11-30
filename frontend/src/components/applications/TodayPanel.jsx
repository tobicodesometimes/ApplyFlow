const TodayPanel = ({ applications }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAndOverdue = applications.filter((app) => {
    if (!app.nextActionDate) return false;
    const date = new Date(app.nextActionDate);
    date.setHours(0, 0, 0, 0);
    return date <= today; // today or earlier
  });

  if (!todayAndOverdue.length) return null;

  return (
    <section style={{ marginBottom: '1rem' }}>
      <h2>Today & Overdue Actions</h2>
      <ul>
        {todayAndOverdue.map((app) => (
          <li key={app._id}>
            {app.company} – {app.role} → {app.nextAction || 'No action set'}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodayPanel;
