const TodayPanel = ({ applications }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAndOverdue = applications
    .filter((app) => {
      if (!app.nextActionDate) return false;
      const date = new Date(app.nextActionDate);
      date.setHours(0, 0, 0, 0);
      return date <= today;
    })
    .sort((a, b) => {
      const aDate = new Date(a.nextActionDate);
      const bDate = new Date(b.nextActionDate);
      return aDate - bDate;
    });

  return (
    <>
      <h2 className="subheading">Today & Overdue Actions</h2>
      {todayAndOverdue.length === 0 ? (
        <p className="text-muted">No actions due today. 🙌</p>
      ) : (
        <ul>
          {todayAndOverdue.map((app) => (
            <li key={app._id}>
              {app.company} – {app.role} → {app.nextAction || 'No action set'}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TodayPanel;


