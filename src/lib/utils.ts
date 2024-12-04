export function timeToMilliseconds(time: string): number {
  try {
    const [minutes, rest] = time.split(':');
    const [seconds, milliseconds] = rest.split('.');

    return (
      parseInt(minutes, 10) * 60 * 1000 + // Convert minutes to milliseconds
      parseInt(seconds, 10) * 1000 + // Convert seconds to milliseconds
      parseInt(milliseconds, 10) // Add milliseconds
    );
  } catch {
    return Number.MAX_VALUE;
  }
}
