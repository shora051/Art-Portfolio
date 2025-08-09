import { useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [blurb, setBlurb] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('blurb', blurb);
      formData.append('description', description);
      for (const file of images) {
        formData.append('image', file);
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload project');
      setMessage('Project uploaded successfully!');
      setTitle('');
      setBlurb('');
      setDescription('');
      setImages([]);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Admin: Add Project</h1>
      <form onSubmit={handleSubmit} className="card">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Blurb (home tile text)
          <input
            type="text"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Images (one or more)
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Uploading…' : 'Upload Project'}
        </button>
        {message && <p className="message">{message}</p>}
      </form>

      <style jsx>{`
        .container {
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        h1 {
          margin-bottom: 1rem;
        }
        .card {
          display: grid;
          gap: 1rem;
          background: #ffffff;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 10px 30px rgba(255, 0, 128, 0.15);
          border: 2px solid #ffd1f3;
        }
        label {
          display: grid;
          gap: 0.5rem;
          font-weight: 600;
        }
        input[type="text"], textarea, input[type="file"] {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 2px solid #ff8bd1;
          outline: none;
          background: #fff8ff;
        }
        input:focus, textarea:focus {
          border-color: #ff00a8;
          box-shadow: 0 0 0 4px rgba(255, 0, 168, 0.1);
        }
        button {
          background: linear-gradient(90deg, #ff00a8, #ffae00);
          border: none;
          color: white;
          font-weight: 700;
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          cursor: pointer;
        }
        .message { font-weight: 600; }
      `}</style>
    </div>
  );
}


