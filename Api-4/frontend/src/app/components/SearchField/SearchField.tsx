import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchBarContainer } from './styles';

interface SearchBarProps {
  onSearch: (query: string) => void;
  width?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, width = '100%' }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <SearchBarContainer width={width} onSubmit={(e) => e.preventDefault()}>
      <div className="search-icon" onClick={handleSearchClick}>
        <FaSearch />
      </div>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
