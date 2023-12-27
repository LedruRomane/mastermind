import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return <>
    {/* todo: add header */}
    <main className="flex flex-col p-6 w-full max-w-main-content">
      {children}
    </main>
    {/* todo: add footer */}
  </>;
}
