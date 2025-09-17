// Utilities to normalize Firestore timestamps and various date inputs
// to Date or ISO 8601 string consistently across the app.

export function toDate(value: any): Date | null {
  if (!value) return null;
  try {
    // Firestore Timestamp (has toDate method)
    if (typeof value.toDate === 'function') return value.toDate();
    // Firestore-like object: { _seconds, _nanoseconds }
    if (typeof value._seconds === 'number') {
      const ms = value._seconds * 1000 + Math.floor((value._nanoseconds || 0) / 1_000_000);
      return new Date(ms);
    }
    // JS Date or ISO string/epoch
    return new Date(value);
  } catch {
    return null;
  }
}

export function toIsoDate(value: any): string | undefined {
  const d = toDate(value);
  return d ? d.toISOString() : undefined;
}
