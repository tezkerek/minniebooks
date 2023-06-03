export function timeSince(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.valueOf() - date.valueOf()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + "y";
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "min";
  }

  return Math.floor(seconds) + "s";
}
