// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import pckg from "../../../../package.json";
import ButtonNormal from "../ButtonNormal";

const issueUrlBase = `${pckg.homepage}/issues/new`;

const issueBody = (
  error: Error
) => `PM2 DevTools crashed during an operation.<br />
Error message: \`${error.message}\`<br />
User agent: \`${escape(window.navigator.userAgent)}\`<br />

<details>
<summary>Stack trace:</summary>

\`\`\`
Stack trace: ${error.stack}
\`\`\`

</details>
`;

type PanelErrorProps = {
  error: Error;
};

const PanelError: React.FC<PanelErrorProps> = ({ error }: PanelErrorProps) => (
  <div className="w-screen h-screen relative">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm text-center">
      <h1 className="font-semibold mb-3">Yikes</h1>
      <p className="text-sm mb-3">
        PM2 DevTools encountered a problem and crashed. You can help by filing
        an issue. Click the button below to pre-fill an issue on GitHub with the
        relevant information.
      </p>
      <ButtonNormal
        onClick={() => {
          window.open(
            `${issueUrlBase}?title=${encodeURIComponent(
              "Panel crash report"
            )}&body=${issueBody(error)}`
          );
        }}
      >
        File issue
      </ButtonNormal>
    </div>
  </div>
);

export default PanelError;
