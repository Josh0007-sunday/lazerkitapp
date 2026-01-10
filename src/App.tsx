
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LazerkitProvider } from 'lazerkit-webauthn';
import './App.css'
import LazerkitLanding from './component/main'
import { WalletDemo } from './component/demo/WalletDemo'

function App() {
  const walletConfig = {
    rpcUrl: 'https://rpc.sepolia.mantle.xyz/', // Mantle Sepolia Testnet
    chainId: 5003,
    rpName: 'Lazerkit Wallet',
    rpId: window.location.hostname,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LazerkitLanding />} />
        <Route 
          path="/demo" 
          element={
            <LazerkitProvider rpcConfig={walletConfig}>
              <WalletDemo />
            </LazerkitProvider>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
