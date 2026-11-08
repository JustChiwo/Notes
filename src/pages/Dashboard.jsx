import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/api.js";
import DashboardLayout from "../components/DashboardLayout.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setError("");
    setLoading(true);

    try {
      await logout();
      clearUser();
      navigate("/login");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout
      error={error}
      loading={loading}
      onLogout={handleLogout}
      userEmail={user.email}
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">Your workspace</p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">My Notes</h2>
        </div>
        <span className="text-sm text-muted">Welcome, {user.email}</span>
      </div>
      <EmptyState />
    </DashboardLayout>
  );
}

export default Dashboard;
