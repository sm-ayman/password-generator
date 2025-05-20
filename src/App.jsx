import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [isAllowedNum, setIsAllowedNum] = useState(false);
  const [isAllowedChar, setIsAllowedChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Generate password
  const passwordGenerator = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isAllowedNum) characters += "0123456789";
    if (isAllowedChar) characters += "!@#$%^&*()_+-=[]{}";

    let pass = "";
    for (let i = 0; i < passwordLength; i++) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(pass);
  }, [passwordLength, isAllowedNum, isAllowedChar]);

  // Copy to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  // Regenerate password when options change
  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, isAllowedNum, isAllowedChar, passwordGenerator]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-6">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border-2 border-indigo-400 p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              🔐 Password Generator
            </h1>
            <p className="text-gray-500 text-sm">
              Secure your accounts with strong passwords
            </p>
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="flex-grow px-3 py-2 text-gray-700 outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500 transition-all"
            >
              Copy to Clipboard
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">
                Password Length: {passwordLength}
              </label>
              <input
                type="range"
                min={6}
                max={32}
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="w-1/2"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="includeNumbers"
                checked={isAllowedNum}
                onChange={() => setIsAllowedNum((prev) => !prev)}
                className="accent-indigo-600"
              />
              <label htmlFor="includeNumbers" className="text-gray-700">
                Include Numbers
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="includeSymbols"
                checked={isAllowedChar}
                onChange={() => setIsAllowedChar((prev) => !prev)}
                className="accent-indigo-600"
              />
              <label htmlFor="includeSymbols" className="text-gray-700">
                Include Symbols
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* copied alert */}
      {copied && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 z-50">
          Password copied to clipboard ✔
        </div>
      )}

      {/* developer info - sm_ayman */}
      <footer className="text-center text-white mt-6">
        <p className="text-sm">
          Developed by <span className="font-semibold">Sultan Md. Ayman</span>
        </p>
        <div className="flex justify-center space-x-5 mt-2">
          <a
            href="https://github.com/sm-ayman"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sultan-md-ayman"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 underline"
          >
            LinkedIn
          </a>
          <a
            href="https://sm-ayman.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 underline"
          >
            Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
