import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function SignUp() {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail] =useState('');
  const router = useRouter();

  // Handle sign-up form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username ,email && password ) {
      signUp(username,email, password);
      router.push('/'); // Redirect to home after signing up
    }else{
          alert='all feild is required'
    
    
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.input}
        />
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className={styles.input}
        />
        <input

          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}
