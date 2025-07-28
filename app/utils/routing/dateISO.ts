export const isNowBetween = (startISO: string, endISO: string): boolean => {
  const now = new Date();
  const start = new Date(startISO);
  const end = new Date(endISO);

  return now >= start && now <= end;
};

export const isNowBetweenISOHours = (startISO: string, endISO: string): boolean => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const start = new Date(startISO);
  const end = new Date(endISO);

  const startMinutes = start.getUTCHours() * 60 + start.getUTCMinutes();
  const endMinutes = end.getUTCHours() * 60 + end.getUTCMinutes();

  if (startMinutes <= endMinutes) {
    // Caso normal
    return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
  } else {
    // Caso que cruza medianoche
    return nowMinutes >= startMinutes || nowMinutes <= endMinutes;
  }
};