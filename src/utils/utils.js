export function formatDate(date, format) {
  if (!date) return '-';
  switch (format) {
    case 'mmm dd, yyyy':
      return `${new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} ${new Date(date).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
      })}`;
    case 'mm dd, yyyy':
      return `${new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`;
    case 'EEEE mmm dd, yyyy':
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'mm/dd/yyyy':
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    case 'hh:mm':
      return `${new Date(date).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
      })}`;
    default:
      return date;
  }
}

export function formatDay(date) {
  const currenDate = new Date();
  const yesterday = currenDate.setDate(currenDate.getDate() - 1);

  if (
    formatDate(date, 'EEEE mmm dd, yyyy') ===
    formatDate(new Date(), 'EEEE mmm dd, yyyy')
  ) {
    return `Today, ${formatDate(date, 'mm dd, yyyy')}`;
  }
  if (
    formatDate(date, 'EEEE mmm dd, yyyy') ===
    formatDate(yesterday, 'EEEE mmm dd, yyyy')
  ) {
    return `Yesterday, ${formatDate(date, 'mm dd, yyyy')}`;
  } else {
    return formatDate(date, 'EEEE mmm dd, yyyy');
  }
}

export function getDaysDiff(date) {
  const currentDate = new Date();
  const valueDate = new Date(date);

  // Convert dates to UTC timestamps
  let utc1 = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  let utc2 = Date.UTC(
    valueDate.getFullYear(),
    valueDate.getMonth(),
    valueDate.getDate()
  );

  // Calculate the time difference in milliseconds
  let timeDiff = Math.abs(utc2 - utc1);

  // Convert milliseconds to days
  let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (utc1 < utc2) {
    return `${daysDiff} Days Left`;
  } else {
    return `${daysDiff} Days Ago`;
  }
}

export function uid() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ''
  );
}
