// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import PanelError from "../PanelError";

type PanelErrorBoundaryState = {
  error?: Error;
};

type PanelErrorBoundaryProps = { children: React.ReactNode };

class PanelErrorBoundary extends React.Component {
  state: PanelErrorBoundaryState;

  constructor(props: PanelErrorBoundaryProps) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error): PanelErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error): void {
    // Should we have Sentry or something here?
    console.log("An error was caught", error);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return <PanelError error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default PanelErrorBoundary;
