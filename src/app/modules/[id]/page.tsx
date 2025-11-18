// src/app/modules/[id]/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { DocumentUpload } from './upload';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModuleDetailPage({ params }: Props) {
  const { id } = await params;      // 👈 hier wird gewartet
  const moduleId = id;

  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const { data: moduleRow, error: moduleError } = await supabase
    .from('modules')
    .select('*')
    .eq('id', moduleId)
    .eq('user_id', userId)
    .single();

  if (moduleError || !moduleRow) {
    console.error(moduleError);
    notFound();
  }

  const { data: documents, error: docError } = await supabase
    .from('documents')
    .select('*')
    .eq('module_id', moduleId)
    .order('created_at', { ascending: false });

  if (docError) {
    console.error(docError);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Module: {moduleRow.name}
      </h1>

      <section className="border rounded-lg p-4 space-y-3">
        <h2 className="font-medium">Upload documents (PDF)</h2>
        <DocumentUpload moduleId={moduleId} />
      </section>

      <section className="space-y-2">
        <h2 className="font-medium">Documents</h2>
        {documents && documents.length > 0 ? (
          <ul className="space-y-1 text-sm">
            {documents.map((d: any) => (
              <li
                key={d.id}
                className="border rounded px-3 py-2 flex items-center justify-between"
              >
                <span>{d.file_name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">
            No documents uploaded yet.
          </p>
        )}
      </section>
    </main>
  );
}