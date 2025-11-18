'use client';

import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

type Props = {
  moduleId: string;
};

export function DocumentUpload({ moduleId }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported for now.');
      return;
    }

    setError(null);
    setUploading(true);

    const filePath = `${moduleId}/${Date.now()}-${file.name}`;

    // 1) Upload to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (storageError) {
      console.error(storageError);
      setError('Error uploading file.');
      setUploading(false);
      return;
    }

    // 2) Write row into documents table
    const { error: insertError } = await supabase.from('documents').insert({
      module_id: moduleId,
      file_name: file.name,
      storage_path: filePath,
    });

    if (insertError) {
      console.error(insertError);
      setError('Error saving document info.');
      setUploading(false);
      return;
    }

    setUploading(false);
    // kleine UX-Abkürzung: Seite reloaden
    window.location.reload();
  }

  return (
    <div className="space-y-2 text-sm">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading…</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}