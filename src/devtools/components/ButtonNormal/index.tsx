// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { ReactNode } from "react";

type ButtonNormalProps = {
  label?: string;
  title?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
};

const ButtonNormal: React.FC<ButtonNormalProps> = ({
  label,
  title,
  className = "",
  type = "button",
  onClick,
  children,
}: ButtonNormalProps) => (
  <button
    className={`px-3 py-2 border text-sm rounded bg-light-grey-100 border-light-grey-400 text-dark-grey-600 hover:bg-light-grey-200 focus:bg-light-grey-200 active:bg-light-grey-300 dark:bg-dark-grey-600 dark:border-dark-grey-600 dark:text-light-grey-550 ${className}`}
    title={title || label}
    {...{ type, onClick }}
  >
    {children || label}
  </button>
);

export default ButtonNormal;
