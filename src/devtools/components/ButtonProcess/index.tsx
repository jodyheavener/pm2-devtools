// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";

type ButtonProcessProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  highlightClass?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ButtonProcess: React.FC<ButtonProcessProps> = ({
  icon: Icon,
  title,
  highlightClass = "text-dark-grey-500 dark:text-light-grey-500",
  onClick,
}: ButtonProcessProps) => (
  <button
    type="button"
    className={`h-5 px-1 active:text-opacity-50 ${highlightClass}`}
    {...{ title, onClick }}
  >
    <Icon className="fill-current" />
  </button>
);

export default ButtonProcess;
