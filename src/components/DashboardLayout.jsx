import Logo from './Logo.jsx';
import Sidebar from './Sidebar.jsx';

function DashboardLayout({ userEmail, loading, onLogout, error, children }) {
  return (
    <main className="min-h-screen bg-canvas p-3 font-sans text-ink sm:p-6 lg:p-10">
      <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1440px] flex-col overflow-hidden rounded-xl border border-white bg-paper shadow-[0_24px_70px_rgba(27,39,66,0.10)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-5rem)]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-8 sm:gap-12">
            <Logo />
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">MY NOTES</h1>
          </div>
          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            <span className="hidden max-w-48 truncate text-sm font-medium text-ink sm:block">{userEmail}</span>
            <button
              className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
              onClick={onLogout}
              type="button"
            >
              {loading ? 'Logging out...' : 'Log out'}
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col md:flex-row">
          <Sidebar />

          <div className="flex-1 bg-content px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-5xl">
              {error && (
                <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                  {error}
                </p>
              )}
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardLayout;
