import styled from 'styled-components';

export const SearchBarContainer = styled.form<{ width: string }>`
  width: ${(props) => props.width};
  display: flex;
  align-items: center;
  background-color: #D9D9D9;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 4px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.40);

  input[type="text"] {
    flex: 1;
    font-size: 17px;
    border: none;
    padding: 4px;
    outline: none;
    background-color: #D9D9D9;
    color: #777777;
    font-weight: 500;
    font-family: 'Prompt';
  }

  .search-icon {
    cursor: pointer;
    padding: 8px;
    margin-right: 4px;
    margin-left: 8px;
    background-color: #D9D9D9;
    color: #777777;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;
