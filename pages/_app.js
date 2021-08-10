import { AuthProvider } from "@/lib/auth"
import { Global, css } from '@emotion/react';

import { ChakraProvider } from "@chakra-ui/react"
import custumeTheme from '@/styles/theme';

const GlobalStyle = ({ children }) => (
  <>
    <Global
      styles={css`
        // ::selection {
        //   background-color: #0af5f4;
        //   color: #fefefe;
        // }
        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: white;
        }
      `}
    />
    {children}
  </>
);

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={custumeTheme} resetCSS >
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
