import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { user, logOut } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();

  // Redirect to Sign-Up page if no user is logged in
  useEffect(() => {
    if (!user) {
      router.push('/signup'); // Redirect to sign-up if no user is found
    }
  }, [user, router]);

  // Add bookmark function
  const addBookmark = (e) => {
    e.preventDefault();
    if (url && title) {
      const newBookmark = {
        id: Date.now(),
        title,
        url,
      };
      setBookmarks([...bookmarks, newBookmark]);
      setTitle('');
      setUrl('');
    }
  };

  // Delete bookmark function
  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <button onClick={logOut} className={styles.button}>Log Out</button>

          <form onSubmit={addBookmark} className={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Bookmark Title"
              className={styles.input}
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Bookmark URL"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Add Bookmark</button>
          </form>

          <div className={styles.bookmarkList}>
            {bookmarks.length === 0 ? (
              <p>No bookmarks added yet</p>
            ) : (
              bookmarks.map((bookmark) => (
                <div key={bookmark.id} className={styles.bookmarkItem}>
                  <h2>{bookmark.title}</h2>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a>
                  <button onClick={() => deleteBookmark(bookmark.id)} className={styles.deleteButton}>Delete</button>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
