const escapeCsvValue = (value) => {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Escape quotes by doubling them
  const escaped = str.replace(/"/g, '""');
  // Wrap in quotes if it contains commas, quotes, or newlines
  if (/[",\n]/.test(escaped)) return `"${escaped}"`;
  return escaped;
};

const formatDate = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toISOString().slice(0, 10);
  } catch {
    return '';
  }
};

export const exportApplicationsToCsv = (applications, filename = 'applyflow-applications.csv') => {
  if (!applications || applications.length === 0) {
    alert('No applications to export.');
    return;
  }

  const headers = [
    'Company',
    'Role',
    'Status',
    'AppliedDate',
    'NextAction',
    'NextActionDate',
    'JobLink',
    'Notes',
  ];

  const rows = applications.map((app) => [
    app.company || '',
    app.role || '',
    app.status || '',
    formatDate(app.appliedDate),
    app.nextAction || '',
    formatDate(app.nextActionDate),
    app.jobLink || '',
    app.notes || '',
  ]);

  const csvLines = [
    headers.join(','),
    ...rows.map((row) => row.map(escapeCsvValue).join(',')),
  ];

  const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
