import { ChangeEvent } from 'react';

const SearchBox = () => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO To implement
  };

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Recherche ..."
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
