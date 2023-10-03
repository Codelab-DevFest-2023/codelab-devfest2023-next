'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const SearchBox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentPathname = pathname ?? '/';
    const value = event.target.value;
    setSearchValue(value);

    const queryParams = new URLSearchParams();
    queryParams.append('query', encodeURI(value));

    if (value.length > 3) {
      router.push(`${currentPathname}?${queryParams.toString()}`);
    }

    if (value.length <= 2 && searchParams?.get('query')) {
      router.push(currentPathname);
    }
  };

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Recherche ..."
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
