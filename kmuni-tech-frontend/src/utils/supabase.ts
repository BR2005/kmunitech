import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

function getRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing ${String(name)}. Configure it in .env.local`);
  }
  return value;
}

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;
  const url = getRequiredEnv('VITE_SUPABASE_URL');
  const anonKey = getRequiredEnv('VITE_SUPABASE_ANON_KEY');
  cachedClient = createClient(url, anonKey);
  return cachedClient;
}

function safeFileName(original: string) {
  const cleaned = original.trim().replace(/[^a-zA-Z0-9._-]+/g, '_');
  return cleaned.length > 0 ? cleaned : 'video';
}

function randomId() {
  const anyCrypto = globalThis.crypto as unknown as { randomUUID?: () => string } | undefined;
  if (anyCrypto?.randomUUID) return anyCrypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function uploadLessonVideoToSupabase(options: {
  file: File;
  instructorId?: string;
  courseTitle?: string;
}): Promise<{ publicUrl: string; path: string }>
{
  const client = getSupabaseClient();
  const bucket = import.meta.env.VITE_SUPABASE_VIDEO_BUCKET || 'edtechkmunitek';

  const instructorPart = options.instructorId ? safeFileName(options.instructorId) : 'instructor';
  const titlePart = options.courseTitle ? safeFileName(options.courseTitle).slice(0, 60) : 'course';
  const fileName = `${randomId()}-${safeFileName(options.file.name)}`;
  const path = `lessons/${instructorPart}/${titlePart}/${fileName}`;

  const { error } = await client.storage
    .from(bucket)
    .upload(path, options.file, {
      upsert: false,
      contentType: options.file.type || 'video/mp4',
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = client.storage.from(bucket).getPublicUrl(path);
  const publicUrl = data?.publicUrl;
  if (!publicUrl) {
    throw new Error('Could not compute public URL for uploaded video');
  }

  return { publicUrl, path };
}
