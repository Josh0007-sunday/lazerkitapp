import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazerkit } from 'lazerkit-webauthn';
import { Wallet, Copy, Check, ArrowLeft, Lock, Unlock } from 'lucide-react';

interface UserSession {
  username: string;
  credentialId: string;
}

export const WalletDemo: React.FC = () => {
  const navigate = useNavigate();
  const { 
    passkeyWallet,
    isLoggedIn,
    currentUser,
    walletInfo,
    balance,
    isWalletConnected,
    hasStoredWallet,
    createPasskeyWallet,
    unlockPasskeyWallet,
    lockPasskeyWallet,
    register,
    logout,
  } = useLazerkit();
  
  const [usernameInput, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLoginMode, setShowLoginMode] = useState(false);

  const handleRegister = async () => {
    if (!usernameInput.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register(usernameInput);
      await createPasskeyWallet(usernameInput);
      setUsernameInput('');
    } catch (err: any) {
      setError(err.message || 'Failed to register passkey');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticate = async () => {
    setLoading(true);
    setError(null);

    try {
      // For login without username, just try to authenticate with existing passkey
      await unlockPasskeyWallet();
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Make sure you have a passkey created.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAddress = () => {
    if (walletInfo?.address) {
      navigator.clipboard.writeText(walletInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
          .orbitron { font-family: 'Orbitron', sans-serif; }
        `}</style>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-900 hover:text-indigo-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Wallet Demo</h1>
          </div>
        </nav>

        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
                <Wallet className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2 orbitron">Create Wallet</h2>
              <p className="text-gray-600">Secure your assets with passkey authentication</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {showLoginMode ? (
              // Login Mode - No username required
              <div className="space-y-4">
                <p className="text-center text-gray-600 mb-6">
                  Sign in with your existing passkey
                </p>
                <button
                  onClick={handleAuthenticate}
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loading ? 'Authenticating...' : '🔐 Login with Passkey'}
                </button>
                <button
                  onClick={() => {
                    setShowLoginMode(false);
                    setError(null);
                  }}
                  className="w-full text-gray-900 hover:text-indigo-600 font-semibold py-3 transition-colors"
                >
                  Create New Wallet Instead
                </button>
              </div>
            ) : (
              // Registration Mode - Username required
              <div className="space-y-4">
                <p className="text-center text-gray-600 mb-4">Create your passkey wallet</p>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-900"
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleRegister}
                  disabled={loading || !usernameInput.trim()}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating Passkey...' : '✨ Create Passkey Wallet'}
                </button>

                <button
                  onClick={() => {
                    setShowLoginMode(true);
                    setError(null);
                  }}
                  className="w-full text-gray-900 hover:text-indigo-600 font-semibold py-3 transition-colors"
                >
                  Already have a passkey? Login
                </button>
              </div>
            )}

            {/* Features */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Why Passkeys?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>No passwords to remember or steal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>Biometric security with your device</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>Industry-standard WebAuthn protocol</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        .orbitron { font-family: 'Orbitron', sans-serif; }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Wallet Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-gray-900 hover:text-indigo-600 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 orbitron">
              Welcome, {currentUser?.username}!
            </h2>
            <p className="text-gray-600">Your passkey-secured wallet is ready</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Wallet Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Wallet Address</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your wallet address</p>
                  <button
                    onClick={handleCopyAddress}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group"
                  >
                    <code className="flex-1 text-left text-xs text-gray-900 font-mono break-all">
                      {walletInfo?.address || 'No wallet created'}
                    </code>
                    <div className="flex items-center gap-1 text-indigo-600 whitespace-nowrap">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-xs font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-xs font-semibold">Copy</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Balance</p>
                  <div className="text-4xl font-bold text-gray-900">
                    <span>{balance ? parseFloat(balance).toFixed(4) : '0.0000'}</span>
                    <span className="text-lg text-gray-600 ml-2">ETH</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">On Mantle Sepolia Testnet</p>
                </div>
              </div>
            </div>

            {/* Security Status Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Security Status</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-semibold text-gray-900">Passkey Authentication</span>
                  <span className="text-green-600 font-bold">✓ Active</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-semibold text-gray-900">Wallet Status</span>
                  <span className={`font-bold ${!isWalletConnected ? 'text-orange-600' : 'text-green-600'}`}>
                    {!isWalletConnected ? '🔒 Locked' : '🔓 Unlocked'}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Credential ID</p>
                  <code className="text-xs text-gray-600 break-all bg-gray-50 p-2 rounded block">
                    {currentUser?.credentialId?.slice(0, 40) || 'No credential'}...
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {!isWalletConnected && hasStoredWallet ? (
              <button
                onClick={handleAuthenticate}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all hover:scale-105"
              >
                <Unlock className="w-5 h-5" />
                {loading ? 'Unlocking...' : 'Unlock Wallet'}
              </button>
            ) : isWalletConnected ? (
              <button
                onClick={lockPasskeyWallet}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all hover:scale-105"
              >
                <Lock className="w-5 h-5" />
                Lock Wallet
              </button>
            ) : null}

            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition-all hover:scale-105"
            >
              Logout
            </button>
          </div>

          {/* Features Section */}
          <div className="mt-12 bg-indigo-50 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What You Can Do</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'View wallet balance in real-time',
                'Copy wallet address securely',
                'Lock/unlock wallet with passkey',
                'Non-custodial asset management',
                'Built on Mantle EVM',
                'WebAuthn industry standard'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold text-lg">✓</span>
                  <span className="text-gray-900 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDemo;
