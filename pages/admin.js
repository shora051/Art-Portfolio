import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [blurb, setBlurb] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    setImages((prev) => [...prev, ...selected]);
  };
  const removeSelectedImageAt = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const resetForm = () => {
    setTitle('');
    setBlurb('');
    setDescription('');
    setImages([]);
    setEditingId(null);
  };

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load projects');
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
      const url = '/api/projects';
      const res = await fetch(url, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload project');
      setMessage('Project uploaded successfully!');
      resetForm();
      fetchProjects();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const beginEdit = (p) => {
    setEditingId(p._id);
    setTitle(p.title || '');
    setBlurb(p.blurb || '');
    setDescription(p.description || '');
    setImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    setSubmitting(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('id', editingId);
      formData.append('title', title);
      formData.append('blurb', blurb);
      formData.append('description', description);
      for (const file of images) formData.append('image', file);

      const res = await fetch('/api/projects', { method: 'PUT', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update project');
      setMessage('Project updated successfully!');
      resetForm();
      fetchProjects();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      fetchProjects();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Admin: Projects</h1>
      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="card">
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
            onChange={handleFileSelect}
          />
        </label>
        {images.length > 0 && (
          <div className="selectedFiles">
            <div className="selectedHeader">
              <strong>{images.length}</strong> file{images.length > 1 ? 's' : ''} selected
              <button type="button" className="secondary small" onClick={() => setImages([])}>Clear</button>
            </div>
            <ul className="fileChips">
              {images.map((f, idx) => (
                <li key={idx} className="fileChip">
                  <span title={f.name}>{f.name}</span>
                  <button type="button" className="chipRemove" onClick={() => removeSelectedImageAt(idx)}>×</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="actions">
          <button type="submit" disabled={submitting}>
            {submitting ? (editingId ? 'Saving…' : 'Uploading…') : (editingId ? 'Save Changes' : 'Upload Project')}
          </button>
          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>Cancel</button>
          )}
        </div>
        {message && <p className="message">{message}</p>}
      </form>

      <div className="listCard">
        <div className="listHeader">
          <h2>All Projects</h2>
          <button className="secondary" onClick={fetchProjects} disabled={loadingProjects}>Refresh</button>
        </div>
        {loadingProjects ? (
          <p>Loading…</p>
        ) : (
          <ul className="projectList">
            {projects.map((p) => (
              <li key={p._id} className="projectRow">
                <div className="projectMeta">
                  <strong>{p.title}</strong>
                  {p.blurb && <span className="muted">{p.blurb}</span>}
                </div>
                <div className="rowActions">
                  <button onClick={() => beginEdit(p)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

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
          box-shadow: 0 10px 30px rgba(132,202,255,0.15);
          border: 2px solid var(--blue-200);
        }
        label {
          display: grid;
          gap: 0.5rem;
          font-weight: 600;
        }
        input[type="text"], textarea, input[type="file"] {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 2px solid var(--pink-200);
          outline: none;
          background: #ffffff;
        }
        input:focus, textarea:focus {
          border-color: var(--pink-400);
          box-shadow: 0 0 0 4px rgba(255, 141, 195, 0.12);
        }
        .actions { display: flex; gap: 0.5rem; }
        button {
          background: linear-gradient(90deg, var(--pink-400), var(--blue-400));
          border: none;
          color: white;
          font-weight: 700;
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          cursor: pointer;
        }
        button.secondary { background: #ffffff; color: #333; border: 2px solid var(--blue-200); }
        button.danger { background: #ff4d4f; }
        .message { font-weight: 600; }

        .listCard { margin-top: 1.5rem; background: #ffffff; border-radius: 16px; border: 2px solid var(--pink-200); box-shadow: 0 10px 30px rgba(255,141,195,0.12); padding: 1rem; }
        .listHeader { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
        .projectList { list-style: none; display: grid; gap: 0.5rem; padding: 0; margin: 0; }
        .projectRow { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border: 1px solid var(--blue-200); border-radius: 12px; background: linear-gradient(120deg, var(--blue-50), #fff 60%, var(--pink-50)); }
        .projectMeta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .muted { color: #666; }
        .rowActions { display: flex; gap: 0.5rem; }

        .selectedFiles { display: grid; gap: 0.5rem; }
        .selectedHeader { display: flex; align-items: center; gap: 0.5rem; }
        .selectedHeader .small { padding: 0.4rem 0.6rem; font-size: 0.85rem; }
        .fileChips { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0; }
        .fileChip { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.6rem; border-radius: 999px; border: 1px solid var(--blue-200); background: #fff; }
        .chipRemove { background: transparent; border: none; color: #666; cursor: pointer; font-size: 1rem; line-height: 1; }
      `}</style>
    </div>
  );
}


