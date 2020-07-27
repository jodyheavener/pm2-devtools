declare module '\*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

type Loggable = {
  id: string;
  type:
    | 'info'
    | 'error'
    | 'alert'
    | 'success'
    | 'command'
    | 'generic'
    | 'process';
  message: string;
  timestamp: number;
  appName?: string;
  processId?: string;
  data?: any;
};

type Process = {
  id: string;
  name: string;
  colorClass: string;
  isActive: boolean;
}

type ContentScript = {
  id: string;
  name: string;
  url: string;
  code: string;
  editing: boolean;
}
