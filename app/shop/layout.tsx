export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen max-w-[100%] bg-pr font-lora text-whitish">
    {children}
  </div>
}

