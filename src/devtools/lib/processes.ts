// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

export const colorClasses = [
  "bg-deep-green-600",
  "bg-blue-700",
  "bg-green-800",
  "bg-purple-700",
  "bg-green-700",
  "bg-rose-600",
  "bg-pale-orange-600",
  "bg-violet-700",
];

export const createProcesses = (
  processes: Omit<Pm2Process, "color">[]
): Pm2Process[] =>
  processes.map((process, index) => {
    return {
      ...process,
      colorClass: colorClasses[index % colorClasses.length],
    };
  });
