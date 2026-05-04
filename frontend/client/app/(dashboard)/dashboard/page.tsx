export default function DashboardPage() {
  return (
    <div className="p-lg md:p-xl space-y-8 max-w-5xl mx-auto">
      <h1 className="font-h1 text-h1 text-on-surface">Dashboard</h1>
      <p className="font-body-md text-on-surface-variant">
        Welcome to your dashboard. This area is under construction for Phase 5.
      </p>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 ambient-shadow-card p-lg">
        <h2 className="font-h2 text-h2 mb-4">Your Recent Activity</h2>
        <p className="text-outline">No recent activity found.</p>
      </div>
    </div>
  );
}
