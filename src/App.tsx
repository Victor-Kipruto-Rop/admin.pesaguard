import { useEffect, useMemo, useState } from "react";
import {
  Activity, AlertCircle, Bell, ChevronDown, ChevronLeft, ChevronRight, Command,
  ExternalLink, Menu, Search, ShieldCheck, X, RefreshCw, ArrowUpRight,
  Building2, Users, ArrowLeftRight, ShieldAlert, Server, Clock3, CheckCircle2,
} from "lucide-react";
import { allItems, navigation, type NavItem } from "./data/navigation";
import { adminApi } from "./lib/api";

type RecordRow = Record<string, unknown>;
const titleCase = (value: string) => value.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
const API_READY = Boolean(import.meta.env.VITE_ADMIN_API_BASE_URL);

function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);
  const [range, setRange] = useState("7 days");
  const [apiState, setApiState] = useState<"checking" | "online" | "offline" | "unconfigured">("checking");
  const [overview, setOverview] = useState<RecordRow | null>(null);
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const current = allItems.find(item => item.slug === active) ?? allItems[0];
  const filteredNav = useMemo(() => navigation.map(group => ({
    ...group, items: group.items.filter(item => !search || item.label.toLowerCase().includes(search.toLowerCase())),
  })).filter(group => group.items.length), [search]);

  useEffect(() => {
    let alive = true;
    if (!API_READY) { setApiState("unconfigured"); return; }
    adminApi.health().then(result => {
      if (alive) setApiState(result.error ? "offline" : "online");
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    if (active === "dashboard") {
      setLoading(true);
      adminApi.overview().then(result => {
        if (!alive) return;
        setOverview(result.data);
        setError(result.error || "");
        setLoading(false);
      });
    } else {
      const resource = active.replace(/-/g, "_");
      setLoading(true);
      adminApi.list(resource).then(result => {
        if (!alive) return;
        const payload = result.data as { items?: RecordRow[] } | null;
        setRecords(Array.isArray(payload?.items) ? payload!.items! : []);
        setError(result.error || "");
        setLoading(false);
      });
    }
    return () => { alive = false; };
  }, [active]);

  const navigate = (item: NavItem) => {
    setActive(item.slug);
    setMobileOpen(false);
    setError("");
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setGlobalSearch(true); }
      if (event.key === "Escape") { setGlobalSearch(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navContent = (
    <>
      <div className="brand">
        <div className="brand-mark"><ShieldCheck size={22} strokeWidth={2.5}/></div>
        {!collapsed && <div className="brand-copy"><strong>PesaGuard</strong><span>SUPER ADMIN</span></div>}
        <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18}/></button>
      </div>
      <div className="workspace-switch">
        <div className="workspace-avatar">PG</div>
        {!collapsed && <div className="workspace-copy"><strong>Platform workspace</strong><span>Global administration</span></div>}
        {!collapsed && <ChevronDown size={15} className="muted-icon"/>}
      </div>
      <div className="nav-search"><Search size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a page..." aria-label="Find a page"/><kbd>/</kbd></div>
      <nav className="sidebar-nav" aria-label="Admin navigation">
        {filteredNav.map(group => <section className="nav-group" key={group.id}>
          {!collapsed && <div className="nav-heading">{group.title}</div>}
          {group.items.map(item => {
            const Icon = item.icon;
            return <button key={item.slug} title={collapsed ? item.label : undefined} className={`nav-item ${active === item.slug ? "active" : ""}`} onClick={() => navigate(item)}>
              <Icon size={17} strokeWidth={1.9}/>{!collapsed && <span>{item.label}</span>}
              {active === item.slug && <i/>}
            </button>;
          })}
        </section>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="environment"><span className={`status-dot ${apiState === "online" ? "green" : apiState === "offline" ? "red" : "amber"}`}/>{!collapsed && <span>{apiState === "online" ? "API connected" : apiState === "offline" ? "API unavailable" : apiState === "unconfigured" ? "API not configured" : "Checking API"}</span>}</div>
        {!collapsed && <div className="sidebar-user"><div className="user-avatar">VK</div><div className="user-copy"><strong>Platform administrator</strong><span>Privileged account</span></div><button className="icon-button" aria-label="Admin options"><ChevronDown size={16}/></button></div>}
      </div>
    </>
  );

  return <div className="app-shell">
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>{navContent}</aside>
    {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}><div className="mobile-sidebar" onClick={e => e.stopPropagation()}>{navContent}</div></div>}
    <main className={`main-area ${collapsed ? "expanded" : ""}`}>
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-button desktop-collapse" onClick={() => setCollapsed(v => !v)} aria-label="Toggle sidebar">{collapsed ? <ChevronRight size={19}/> : <ChevronLeft size={19}/>}</button>
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20}/></button>
          <div className="breadcrumbs"><span>Platform</span><ChevronRight size={14}/><strong>{current.label}</strong></div>
        </div>
        <div className="topbar-actions">
          <div className={`api-pill ${apiState}`}><span className="status-dot"/>{apiState === "online" ? "Connected" : apiState === "offline" ? "Disconnected" : apiState === "unconfigured" ? "Not connected" : "Checking"}</div>
          <button className="top-search" onClick={() => setGlobalSearch(true)}><Search size={16}/><span>Search anything</span><kbd><Command size={11}/> K</kbd></button>
          <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18}/><i/></button>
          <div className="top-avatar">VK</div>
        </div>
      </header>
      <div className="page-wrap">
        {active === "dashboard" ? <Dashboard overview={overview} loading={loading} error={error} range={range} setRange={setRange} apiState={apiState}/> : <ResourcePage item={current} records={records} loading={loading} error={error} apiConfigured={API_READY}/>}
        <footer className="page-footer"><span>© {new Date().getFullYear()} PesaGuard</span><span>Platform administration <b>•</b> Restricted access</span></footer>
      </div>
    </main>
    {globalSearch && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setGlobalSearch(false); }}>
      <div className="command-modal"><div className="command-input"><Search size={19}/><input autoFocus placeholder="Search admin pages..." value={search} onChange={e => setSearch(e.target.value)} /><kbd>ESC</kbd><button className="icon-button" onClick={() => setGlobalSearch(false)}><X size={17}/></button></div>
        <div className="command-results">{allItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase())).slice(0,12).map(item => {
          const Icon = item.icon; return <button key={item.slug} onClick={() => { navigate(item); setGlobalSearch(false); }}><Icon size={17}/><span>{item.label}</span><ArrowUpRight size={15}/></button>;
        })}{allItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase())).length === 0 && <p>No matching admin pages.</p>}</div>
        <div className="command-hint">Navigate across the PesaGuard administration workspace</div>
      </div>
    </div>}
  </div>;
}

function Dashboard({ overview, loading, error, range, setRange, apiState }: {
  overview: RecordRow | null; loading: boolean; error: string; range: string;
  setRange: (value: string) => void; apiState: string;
}) {
  const metrics = [
    { label: "Organizations", key: "organizations_total", icon: Building2 },
    { label: "Registered users", key: "users_total", icon: Users },
    { label: "Transactions", key: "transactions_total", icon: ArrowLeftRight },
    { label: "Open risk cases", key: "open_risk_cases", icon: ShieldAlert },
  ];
  const value = (key: string) => {
    const v = overview?.[key]; return typeof v === "number" ? v.toLocaleString() : "—";
  };
  return <div className="page-content">
    <div className="page-heading">
      <div><div className="eyebrow">PLATFORM OVERVIEW</div><h1>Good afternoon</h1><p>Your PesaGuard platform command center.</p></div>
      <div className="heading-actions"><span className="updated-label"><Clock3 size={14}/> Live data only</span><button className="button-secondary" onClick={() => window.location.reload()}><RefreshCw size={15}/> Refresh</button></div>
    </div>
    {error && <div className="notice warning"><AlertCircle size={17}/><span>{error} The interface will not substitute sample metrics for live platform data.</span></div>}
    {!API_READY && <div className="notice info"><Activity size={17}/><span>Connect the admin API to populate this workspace. No synthetic tenant, transaction or infrastructure figures are displayed.</span></div>}
    <div className="metric-grid">
      {metrics.map(metric => { const Icon = metric.icon; return <div className="metric-card" key={metric.key}><div className="metric-top"><span>{metric.label}</span><span className="metric-icon"><Icon size={18}/></span></div><div className="metric-value">{loading ? "…" : value(metric.key)}</div><div className="metric-foot">Platform-wide total <span>API sourced</span></div></div>; })}
    </div>
    <div className="section-grid">
      <section className="panel activity-panel">
        <div className="panel-heading"><div><h2>Operational activity</h2><p>Recent platform events</p></div><select value={range} onChange={e => setRange(e.target.value)}><option>24 hours</option><option>7 days</option><option>30 days</option></select></div>
        <div className="empty-chart"><div className="empty-chart-icon"><ChartLineIcon/></div><strong>Waiting for live operational data</strong><span>Connect the admin overview endpoint to display transaction, reconciliation and risk trends.</span></div>
      </section>
      <section className="panel health-panel">
        <div className="panel-heading"><div><h2>Platform health</h2><p>Service connectivity</p></div><span className={`health-badge ${apiState}`}>{apiState === "online" ? "Connected" : apiState === "offline" ? "Unavailable" : "Not configured"}</span></div>
        <HealthRow icon={Server} label="Admin API" status={apiState}/>
        <HealthRow icon={Database} label="Database" status="unknown"/>
        <HealthRow icon={Activity} label="Background workers" status="unknown"/>
        <HealthRow icon={RefreshCw} label="Message processing" status="unknown"/>
        <div className="health-note">Component health is shown only when verified by backend health checks.</div>
      </section>
    </div>
    <div className="section-grid lower-grid">
      <section className="panel"><div className="panel-heading"><div><h2>Priority attention</h2><p>Items requiring administrator action</p></div></div><EmptyState title="No verified alert feed" text="Connect the global alerts endpoint to see active incidents and risk alerts."/></section>
      <section className="panel"><div className="panel-heading"><div><h2>Latest activity</h2><p>Cross-platform audit trail</p></div></div><EmptyState title="No activity feed connected" text="Recent administrator and tenant events will appear here when the audit API is connected."/></section>
    </div>
  </div>;
}

function ChartLineIcon() { return <Activity size={22}/>; }
function HealthRow({ icon: Icon, label, status }: { icon: typeof Server; label: string; status: string }) {
  const good = status === "online";
  return <div className="health-row"><span className="health-icon"><Icon size={16}/></span><span>{label}</span><span className={`health-state ${good ? "good" : status === "offline" ? "bad" : "unknown"}`}>{good ? "Operational" : status === "offline" ? "Unavailable" : "Not verified"}</span></div>;
}
function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><div className="empty-state-mark"><Activity size={19}/></div><strong>{title}</strong><span>{text}</span></div>;
}
function ResourcePage({ item, records, loading, error, apiConfigured }: {
  item: NavItem; records: RecordRow[]; loading: boolean; error: string; apiConfigured: boolean;
}) {
  const Icon = item.icon;
  const columns = records.length ? Object.keys(records[0]).slice(0,5) : [];
  return <div className="page-content">
    <div className="page-heading"><div><div className="eyebrow">PESAGUARD ADMINISTRATION</div><h1>{item.label}</h1><p>{item.description}. Manage and monitor this area of the platform.</p></div><div className="heading-actions"><button className="button-secondary" onClick={() => window.location.reload()}><RefreshCw size={15}/> Refresh</button></div></div>
    {error && <div className="notice warning"><AlertCircle size={17}/><span>{error}</span></div>}
    <div className="resource-toolbar"><div className="resource-search"><Search size={16}/><input placeholder={`Search ${item.label.toLowerCase()}...`}/></div><button className="button-secondary"><span>Filters</span><ChevronDown size={15}/></button><button className="button-primary" disabled><span>+ New action</span></button></div>
    <section className="panel resource-panel">
      <div className="resource-intro"><div className="resource-icon"><Icon size={20}/></div><div><h2>{item.label}</h2><p>Records are scoped by backend authorization and platform permissions.</p></div><span className="record-count">{records.length} records</span></div>
      {!apiConfigured ? <EmptyState title="Admin API not configured" text="Set VITE_ADMIN_API_BASE_URL and connect the corresponding protected admin endpoint to load real records."/> :
       loading ? <div className="loading-state">Loading records…</div> :
       records.length === 0 ? <EmptyState title="No records returned" text="The endpoint returned no records, or this resource has not been connected yet. No sample records are inserted."/> :
       <div className="table-scroll"><table><thead><tr>{columns.map(column => <th key={column}>{titleCase(column)}</th>)}</tr></thead><tbody>{records.map((record,index) => <tr key={String(record.id ?? index)}>{columns.map(column => <td key={column}>{String(record[column] ?? "—")}</td>)}</tr>)}</tbody></table></div>}
    </section>
    <div className="resource-footnote"><CheckCircle2 size={15}/> Read-only data view until the matching protected admin action is implemented and authorized.</div>
  </div>;
}

export default App;
