import Logo from './Logo.jsx';
import Sidebar from './Sidebar.jsx';

function DashboardLayout({ userEmail, loading, onLogout, error, children }) {
  return (
    <main className="h-screen min-h-screen overflow-hidden bg-canvas font-sans text-ink">
      <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-paper">
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 lg:px-10">
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

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <Sidebar />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-content px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
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
