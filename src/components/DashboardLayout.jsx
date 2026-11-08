import { useRef, useState } from 'react';
import logoutIcon from '../assets/icons/logout.svg';
import userIcon from '../assets/icons/user.svg';
import Sidebar from './Sidebar.jsx';

function DashboardLayout({
  userEmail,
  loading,
  onLogout,
  error,
  children,
  notes,
  onSelectNote,
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mobileMenuButtonRef = useRef(null);

  function closeSidebar() {
    setSidebarOpen(false);
    mobileMenuButtonRef.current?.focus();
  }

  return (
    <main className="h-screen min-h-screen overflow-hidden bg-canvas font-sans text-ink">
      <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-paper">
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 lg:px-10">
          <div className="hidden items-center md:flex">
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">MY NOTES</h1>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <button
              aria-expanded={sidebarOpen}
              aria-label="Open notes menu"
              aria-controls="mobile-notes-menu"
              className="rounded-lg border border-line p-2 text-brand transition hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10"
              ref={mobileMenuButtonRef}
              onClick={() => setSidebarOpen(true)}
              type="button"
            >
              <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">My notes</h1>
          </div>
          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            <span className="hidden max-w-48 items-center gap-2 truncate text-sm font-medium text-ink sm:flex">
              <img alt="" aria-hidden="true" className="size-4 shrink-0" src={userIcon} />
              <span className="truncate">{userEmail}</span>
            </span>
            <button
              className="hidden items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60 md:flex"
              disabled={loading}
              onClick={onLogout}
              type="button"
            >
              <img alt="" aria-hidden="true" className="size-4" src={logoutIcon} />
              {loading ? 'Logging out...' : 'Log out'}
            </button>
            <div className="relative md:hidden">
              <button
                aria-expanded={settingsOpen}
                aria-haspopup="menu"
                className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10"
                onClick={() => setSettingsOpen((open) => !open)}
                type="button"
              >
                Settings
              </button>
              {settingsOpen && (
                <div
                  className="absolute right-0 top-full z-30 mt-2 w-52 rounded-xl border border-line bg-paper p-3 shadow-[0_8px_28px_rgba(27,39,66,0.12)]"
                  role="menu"
                >
                  <p className="flex items-center gap-2 truncate px-2 py-2 text-xs text-muted">
                    <img alt="" aria-hidden="true" className="size-4 shrink-0" src={userIcon} />
                    <span className="truncate">{userEmail}</span>
                  </p>
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                    onClick={onLogout}
                    role="menuitem"
                    type="button"
                  >
                    <img alt="" aria-hidden="true" className="size-4" src={logoutIcon} />
                    {loading ? 'Logging out...' : 'Log out'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
          <Sidebar
            mobileOpen={sidebarOpen}
            notes={notes}
            onClose={closeSidebar}
            onSelectNote={onSelectNote}
          />

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
