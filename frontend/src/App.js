import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import './App.css';

const API_URL = 'https://meeting-summary-generator.onrender.com';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState(
    'Summarize in bullet points for executives, using markdown for formatting.'
  );
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [shareStatus, setShareStatus] = useState('');

  const getMarkdownText = () => {
    const rawMarkup = marked(summary || '', { sanitize: true });
    return { __html: rawMarkup };
  };

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      setError('Transcript cannot be empty.');
      return;
    }
    setError('');
    setLoading(true);
    setSummary('');
    setIsEditing(false);

    try {
      const response = await axios.post(`${API_URL}/api/generate`, {
        transcript,
        prompt,
      });
      setSummary(response.data.summary);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.msg
        : 'Server is not responding.';
      setError(`Failed to generate summary: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!summary.trim() || !recipientEmail.trim()) {
      setShareStatus('Summary and recipient email cannot be empty.');
      return;
    }
    setShareStatus('Sharing...');
    setIsEditing(false);

    try {
      await axios.post(`${API_URL}/api/summaries`, {
        originalTranscript: transcript,
        summaryText: summary,
      });

      const shareResponse = await axios.post(`${API_URL}/api/share`, {
        recipientEmail,
        summaryText: summary,
        transcript: transcript,
      });

      setShareStatus(shareResponse.data.msg);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.msg
        : 'Server error.';
      setShareStatus(`Failed to share: ${errorMessage}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Meeting Notes Summarizer</h1>
      </header>
      <main>
        <div className="input-section">
          <h2>1. Upload Transcript</h2>
          <textarea
            placeholder="Paste your meeting notes or call transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <h2>2. Set Custom Instruction</h2>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button onClick={handleGenerateSummary} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Summary'}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        <div className="output-section">
          <div className="summary-header">
            <h2>3. Review and Edit Summary</h2>
            {summary && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="edit-button"
              >
                {isEditing ? 'Save and View' : 'Edit'}
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              className="summary-edit"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          ) : (
            <div
              className="summary-output"
              dangerouslySetInnerHTML={getMarkdownText()}
            />
          )}
        </div>

        <div className="share-section">
          <h2>4. Share Summary</h2>
          <input
            type="email"
            placeholder="Recipient's email address"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <button onClick={handleShare} disabled={!summary || isEditing}>
            Save & Share
          </button>
          {shareStatus && <p className="status">{shareStatus}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
