import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import {
  AdminUnilinkEvent,
  API_BASE_URL,
  createAdminUnilinkEvent,
  fetchAdminUnilinkEvents,
  updateAdminUnilinkEvent,
} from '../../utils/api';

function toAbsoluteUrl(url: string) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

type Draft = {
  title: string;
  poster?: File;
  saving?: boolean;
  error?: string;
};

export default function AdminUnilinkEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState<AdminUnilinkEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [upcomingTitle, setUpcomingTitle] = useState('');
  const [upcomingPoster, setUpcomingPoster] = useState<File | null>(null);
  const [upcomingSaving, setUpcomingSaving] = useState(false);

  const [finishedTitle, setFinishedTitle] = useState('');
  const [finishedPoster, setFinishedPoster] = useState<File | null>(null);
  const [finishedSaving, setFinishedSaving] = useState(false);

  const [drafts, setDrafts] = useState<Record<string, Draft>>({});

  const upcomingEvents = useMemo(
    () => events.filter((e) => e.status === 'upcoming'),
    [events],
  );
  const finishedEvents = useMemo(
    () => events.filter((e) => e.status === 'finished'),
    [events],
  );

  const load = async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchAdminUnilinkEvents(token);
      setEvents(data);
      setDrafts((prev) => {
        const next: Record<string, Draft> = { ...prev };
        for (const item of data) {
          if (!next[item.id]) next[item.id] = { title: item.title };
        }
        return next;
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const createUpcoming = async () => {
    if (!token) return;
    const title = upcomingTitle.trim();
    if (!title) {
      setError('Please enter a title for the upcoming event.');
      return;
    }
    if (!upcomingPoster) {
      setError('Please select a poster image for the upcoming event.');
      return;
    }

    setUpcomingSaving(true);
    setError('');
    try {
      await createAdminUnilinkEvent({ title, status: 'upcoming', poster: upcomingPoster }, token);
      setUpcomingTitle('');
      setUpcomingPoster(null);
      await load();
    } catch (err: any) {
      setError(err?.message || 'Failed to add poster');
    } finally {
      setUpcomingSaving(false);
    }
  };

  const createFinished = async () => {
    if (!token) return;
    const title = finishedTitle.trim();
    if (!title) {
      setError('Please enter a title for the finished event.');
      return;
    }
    if (!finishedPoster) {
      setError('Please select a poster image for the finished event.');
      return;
    }

    setFinishedSaving(true);
    setError('');
    try {
      await createAdminUnilinkEvent({ title, status: 'finished', poster: finishedPoster }, token);
      setFinishedTitle('');
      setFinishedPoster(null);
      await load();
    } catch (err: any) {
      setError(err?.message || 'Failed to add poster');
    } finally {
      setFinishedSaving(false);
    }
  };

  const updateItem = async (id: string) => {
    if (!token) return;
    const draft = drafts[id];
    if (!draft) return;

    const title = draft.title.trim();
    if (!title) {
      setDrafts((d) => ({ ...d, [id]: { ...draft, error: 'Title is required' } }));
      return;
    }

    setDrafts((d) => ({ ...d, [id]: { ...draft, saving: true, error: '' } }));
    try {
      await updateAdminUnilinkEvent(id, { title, poster: draft.poster }, token);
      setDrafts((d) => ({ ...d, [id]: { title, saving: false } }));
      await load();
    } catch (err: any) {
      setDrafts((d) => ({ ...d, [id]: { ...draft, saving: false, error: err?.message || 'Update failed' } }));
    }
  };

  const renderList = (items: AdminUnilinkEvent[]) => {
    if (!items.length) {
      return <p className="text-slate-400 text-sm">No posters added yet.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const draft = drafts[item.id] || { title: item.title };
          return (
            <div key={item.id} className="card p-5">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={toAbsoluteUrl(item.posterUrl)}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
                  <input
                    className="input-field"
                    value={draft.title}
                    onChange={(e) =>
                      setDrafts((d) => ({
                        ...d,
                        [item.id]: { ...draft, title: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Replace poster (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setDrafts((d) => ({
                        ...d,
                        [item.id]: { ...draft, poster: f },
                      }));
                    }}
                  />
                </div>

                {draft.error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-xl px-4 py-3">
                    {draft.error}
                  </div>
                )}

                <button
                  className="btn-primary w-full"
                  disabled={Boolean(draft.saving)}
                  onClick={() => updateItem(item.id)}
                >
                  {draft.saving ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Unilink Events</h1>
        <p className="text-slate-400 mt-1">Manage posters for Upcoming and Finished events.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="card p-6">
            <h2 className="text-white font-semibold text-lg">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="md:col-span-1">
                <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
                <input className="input-field" value={upcomingTitle} onChange={(e) => setUpcomingTitle(e.target.value)} />
              </div>
              <div className="md:col-span-1">
                <label className="block text-slate-300 text-sm font-medium mb-2">Poster image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input-field"
                  onChange={(e) => setUpcomingPoster(e.target.files?.[0] ?? null)}
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <button className="btn-primary w-full" onClick={createUpcoming} disabled={upcomingSaving}>
                  {upcomingSaving ? 'Adding...' : 'Add Poster'}
                </button>
              </div>
            </div>
          </div>

          {loading ? <p className="text-slate-400 text-sm">Loading...</p> : renderList(upcomingEvents)}
        </section>

        <section className="space-y-4">
          <div className="card p-6">
            <h2 className="text-white font-semibold text-lg">Finished Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="md:col-span-1">
                <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
                <input className="input-field" value={finishedTitle} onChange={(e) => setFinishedTitle(e.target.value)} />
              </div>
              <div className="md:col-span-1">
                <label className="block text-slate-300 text-sm font-medium mb-2">Poster image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input-field"
                  onChange={(e) => setFinishedPoster(e.target.files?.[0] ?? null)}
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <button className="btn-primary w-full" onClick={createFinished} disabled={finishedSaving}>
                  {finishedSaving ? 'Adding...' : 'Add Poster'}
                </button>
              </div>
            </div>
          </div>

          {loading ? <p className="text-slate-400 text-sm">Loading...</p> : renderList(finishedEvents)}
        </section>
      </div>
    </DashboardLayout>
  );
}
