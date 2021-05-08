// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

type LogScript = {
  id: string;
  name: string;
  url: string;
  code: string;
  enabled: boolean;
};

type Pm2Process = {
  pmId: number;
  name: string;
  status: "online" | "stopped" | "errored";
  colorClass: string;
};

type Loggable = {
  id: string;
  type:
    | "info"
    | "error"
    | "alert"
    | "success"
    | "command"
    | "generic"
    | "process";
  message: string;
  timestamp: Date;
  name?: string;
  pmId?: number;
  data?: any;
};

type Tab = {
  id: number;
  url?: string;
  scripts: string[];
};
