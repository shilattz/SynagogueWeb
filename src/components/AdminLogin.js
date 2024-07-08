import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../AdminLogin.css'

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setError(''); // איפוס הודעת השגיאה
    try {
      // נסה להתחבר עם שם המשתמש והסיסמא שהוזנו
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Manager'); // נווט לעמוד המנהל לאחר התחברות מוצלחת
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      setError('Invalid email or password.'); // הצגת הודעת שגיאה
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <h2>כניסת מנהל</h2>
        <form onSubmit={handleEmailPasswordLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login with Email and Password</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
