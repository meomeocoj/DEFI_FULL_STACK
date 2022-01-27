import React from 'react';
import { DAppProvider, ChainId } from "@usedapp/core"
import { Header } from "./components/Header"
import { Container } from "@material-ui/core"
import { Main } from "./components/Main"

function App() {
  return (
    <div className="App">
      <DAppProvider config={{
        supportedChains: [ChainId.Kovan, ChainId.Rinkeby],
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000
        }
      }}>
        <Header />
        <Container maxWidth="md">
          <Main />
        </Container>
      </DAppProvider>
    </div>
  );
}

export default App;
