import TodoList from '@/components/TodoList';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="A simple to-do list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <TodoList />
      </main>
    </div>
  );
}
