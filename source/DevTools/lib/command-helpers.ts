export function formatCommand(value: string): string {
  const [command, ...args] = value.split(' ');
  return JSON.stringify({
    command,
    args,
  });
}
