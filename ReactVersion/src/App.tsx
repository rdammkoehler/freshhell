import { useState } from 'react';
import { useHellStorage } from './hooks/useLocalStorage';
import ReactFooter from './components/ReactFooter/ReactFooter';
import './App.css';

function App() {
  const [hellInput, setHellInput] = useState('');
  const { hells, stats, addHell } = useHellStorage();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmedInput = hellInput.trim();
    if (!trimmedInput) {
      return;
    }
    addHell(trimmedInput);
    setHellInput('');
  }

  return (
    <div className="app-container">
      <div className="app-page">
        <img className="app-bg" src="/devil-29973_640.png" alt="" />
        <div className="app-content">

          <header className="app-header">
            <h1 className="app-title">Fresh Hell!</h1>
            <p className="app-subtitle">
              What Fresh Hell is This? Record every hellish experience.
              Your most recent misfortunes and simple stats, all in one place.
            </p>
            <p className="app-credit">
              Catharsis brought to you by{' '}
              <a href="https://x.com/publius503" target="_blank" rel="noopener noreferrer">@publius503</a>
            </p>
          </header>

          <form className="hell-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="hellInput">Describe your fresh hell</label>
            <textarea
              id="hellInput"
              className="hell-textarea"
              rows={3}
              placeholder="What happened this time…"
              value={hellInput}
              onChange={(event) => setHellInput(event.target.value)}
            />
            <div className="form-actions">
              <button className="submit-btn" type="submit">Increase Hell</button>
            </div>
          </form>

          {hells.length > 0 && (
            <section className="hells-list">
              <h2 className="section-heading">Recent Misfortunes</h2>
              <ul>
                {hells.slice(0, 9).map((hell, index) => (
                  <li className="hell-item" key={index}>
                    <span className="hell-description">{hell.description}</span>
                    <span className="hell-date">{String(hell.observed)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="stats-bar">
            Total Hells Observed: <strong>{stats.count}</strong>
          </div>

        </div>
      </div>

      <ReactFooter />
    </div>
  );
}

export default App;
