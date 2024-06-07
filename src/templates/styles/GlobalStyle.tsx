import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
    color: ${({ theme }) => theme.colors.text};
  }
  .MuiOutlinedInput-input{
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default GlobalStyle;
