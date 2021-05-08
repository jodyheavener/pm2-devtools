// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";

type ButtonToolbarProps = {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  title: string;
  highlightClass?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ButtonToolbar: React.FC<ButtonToolbarProps> = ({
  icon: Icon,
  label,
  title,
  highlightClass = "text-dark-grey-500 dark:text-light-grey-500",
  className = "",
  type = "button",
  onClick,
}: ButtonToolbarProps) => (
  <button
    className={`h-5 px-1 inline-flex items-center rounded-sm bg-dark-grey-700 dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 focus:bg-opacity-20 active:bg-opacity-25 ${className} ${highlightClass}`}
    {...{ type, title, onClick }}
  >
    {Icon && <Icon className="fill-current" />}
    {label && <span className="text-xs">{label}</span>}
  </button>
);

export default ButtonToolbar;
