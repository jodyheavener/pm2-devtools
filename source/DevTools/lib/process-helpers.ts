export const processColors = [
  'bg-deep-green-600',
  'bg-blue-700',
  'bg-green-800',
  'bg-purple-700',
  'bg-green-700',
  'bg-rose-600',
  'bg-pale-orange-600',
  'bg-violet-700',
];

// This whole thing could be improved.
export function mergeProcesses(
  currentProcesses: Process[],
  rawProcesses: any[]
) {
  return rawProcesses.map((rawProcess) => {
    const found = currentProcesses.find(
      (currentProcess) => rawProcess.pm_id === currentProcess.id
    );

    if (found) {
      return found;
    }

    return {
      id: rawProcess.pm_id,
      name: rawProcess.name,
      colorClass:
        processColors[Math.floor(Math.random() * processColors.length)],
      isActive: true,
    };
  });
}
