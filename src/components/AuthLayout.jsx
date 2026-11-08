import Logo from './Logo.jsx';

function AuthLayout({ title, description, footer, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-white bg-paper p-7 shadow-[0_24px_70px_rgba(27,39,66,0.12)] sm:p-10">
        <div className="mb-9">
          <Logo />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        {children}
        {footer}
      </section>
    </main>
  );
}

export default AuthLayout;
