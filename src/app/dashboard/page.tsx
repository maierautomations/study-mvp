// src/app/dashboard/page.tsx
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

async function createModule(formData: FormData) {
  'use server';

  const name = (formData.get('name') as string)?.trim();
  if (!name) return;

  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const { error } = await supabase.from('modules').insert({
    name,
    user_id: userId,
  });

  if (error) {
    console.error('Error creating module:', error.message);
  }

  redirect('/dashboard');
}

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const { data: modules, error } = await supabase
    .from('modules')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error loading modules:', error.message);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your modules</h1>
      </header>

      <section className="border rounded-lg p-4 space-y-3">
        <h2 className="font-medium">Create a new module</h2>
        <form action={createModule} className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="e.g. Statistics I"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded bg-black text-white"
          >
            Add
          </button>
        </form>
      </section>

      <section className="space-y-2">
        <h2 className="font-medium">Existing modules</h2>
        {modules && modules.length > 0 ? (
          <ul className="space-y-1">
            {modules.map((m: any) => (
              <li
                key={m.id}
                className="border rounded px-3 py-2 text-sm flex items-center justify-between"
              >
                <span>{m.name}</span>
                <Link
                  href={`/modules/${m.id}`}
                  className="text-xs text-blue-600 underline"
                >
                  Open
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">
            You don&apos;t have any modules yet. Create your first one above.
          </p>
        )}
      </section>
    </main>
  );
}