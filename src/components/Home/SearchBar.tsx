"use client";
import useDebounce from "@/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  const debouncedSearchTerm = useDebounce(search, 500);

  const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={search}
      className="px-3 py-1.5 font-medium text-black rounded-sm w-full max-w-sm"
      placeholder="Search..."
      onChange={onSearchChange}
    />
  );
};

export default SearchBar;
