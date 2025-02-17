import React, { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        if (data.userId) localStorage.setItem('userId', data.userId);
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch {
      alert('Erreur de connexion');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "S'inscrire" : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
