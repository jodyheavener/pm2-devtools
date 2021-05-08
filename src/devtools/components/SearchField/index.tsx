// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { useCallback, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

type SearchFieldProps = {
  placeholder: string;
  onSearch: (query: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  onSearch,
}: SearchFieldProps) => {
  const [query, setQuery] = useState<string>("");
  const hasQuery = query.length > 0;
  let timeout: NodeJS.Timeout | null = null;

  const onKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      clearTimeout(timeout!);

      // @ts-ignore
      timeout = setTimeout(() => {
        const value = (event.target as HTMLInputElement).value;
        onSearch(value);
        setQuery(value);
      }, 150);
    },
    [query]
  );

  return (
    <div className="relative flex flex-row items-center ml-1">
      <SearchIcon
        className={`absolute w-3 h-3 top-1/2 transform -translate-y-1/2 left-0 fill-current pointer-events-none ${
          hasQuery
            ? "text-blue-500 dark:text-blue-400"
            : "text-dark-grey-200 dark:text-light-grey-500"
        }`}
      />
      <input
        type="text"
        {...{ placeholder, onKeyUp }}
        className="pl-5 text-xs w-full bg-transparent text-dark-grey-200 dark:text-light-grey-500"
      />
    </div>
  );
};

export default SearchField;
