import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Slab', serif;
    height: 100%; 
  }

  #root {
    min-height: 100%;
    position: relative;
  }

  a {
		text-decoration: none;
		color: black;
	}

  * {
    box-sizing: border-box;
  }

  

`
