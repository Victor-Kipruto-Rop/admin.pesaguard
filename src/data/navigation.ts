import type { LucideIcon } from "lucide-react";
import {
  Activity, AlertCircle, AlertOctagon, AlertTriangle, Archive, ArrowLeftRight,
  Bell, BellRing, Ban, BrainCircuit, BriefcaseBusiness, Building, Building2,
  CalendarClock, ChartLine, ChartNoAxesCombined, ChartPie, CheckCircle, CircleHelp,
  ClipboardCheck, ClipboardList, Cloud, Container, Contact, ContactRound, Database,
  DatabaseBackup, Download, FileCheck, FileClock, FileSearch, FileText, FileWarning,
  Fingerprint, Gauge, GitBranch, Globe, HardDrive, Headset, History, KeyRound,
  Layers, LayoutDashboard, ListChecks, Lock, LockKeyhole, Mail, MailWarning,
  Megaphone, Monitor, Package, PauseCircle, Radio, RadioTower, RefreshCcw,
  RefreshCw, Search, Send, Server, Settings, Settings2, Shield, ShieldAlert,
  ShieldCheck, Siren, Smartphone, SlidersHorizontal, Undo2, UserCheck, UserCog,
  UserPlus, UserRoundCheck, UserX, UserCircle, Users, UsersRound, Workflow,
} from "lucide-react";

export type NavItem = { label: string; icon: LucideIcon; slug: string; description: string };
export type NavGroup = { id: string; title: string; items: NavItem[] };
const item = (label: string, icon: LucideIcon, slug: string, description = label): NavItem => ({ label, icon, slug, description });

export const navigation: NavGroup[] = [
  { id: "overview", title: "Overview", items: [
    item("Dashboard", LayoutDashboard, "dashboard", "Platform-wide operating picture"),
    item("Live Operations Center", Activity, "live-operations", "Live operational events and processing"),
    item("Platform Analytics", ChartNoAxesCombined, "platform-analytics", "Usage and platform trends"),
    item("Global Alerts", Bell, "global-alerts", "Alerts requiring platform attention"),
  ]},
  { id: "organizations", title: "Organization management", items: [
    item("All Organizations", Building2, "organizations"), item("Active Organizations", Building, "organizations-active"),
    item("Access Requests", UserPlus, "access-requests"), item("KYB & Verification", FileCheck, "verification"),
    item("Onboarding Management", Workflow, "onboarding"), item("Pending Activations", UserRoundCheck, "pending-activations"),
    item("Suspended Organizations", PauseCircle, "suspended-organizations"), item("Archived Organizations", Archive, "archived-organizations"),
    item("Organization Activity", History, "organization-activity"),
  ]},
  { id: "users", title: "Users & management", items: [
    item("All Users", Users, "users"), item("Active Users", UserCheck, "active-users"),
    item("User Invitations", UserPlus, "user-invitations"), item("Pending Activations", UserRoundCheck, "user-activations"),
    item("Suspended Users", UserX, "suspended-users"), item("Tenant User Management", Building2, "tenant-users"),
    item("Roles & Permissions", ShieldCheck, "roles-permissions"), item("Teams & Departments", UsersRound, "teams"),
    item("Staff Management", ContactRound, "staff"), item("Admin Management", UserCog, "admins"),
    item("Super Admin Management", Shield, "super-admins"), item("User Sessions", Monitor, "user-sessions"),
    item("User Activity Logs", History, "user-activity"), item("Account Security", LockKeyhole, "account-security"),
    item("User Management Settings", Settings, "user-settings"),
  ]},
  { id: "transactions", title: "Transaction operations", items: [
    item("All Transactions", ArrowLeftRight, "transactions"), item("Successful Transactions", CheckCircle, "successful-transactions"),
    item("Pending Transactions", Activity, "pending-transactions"), item("Failed Transactions", AlertCircle, "failed-transactions"),
    item("Transaction Reconciliation", RefreshCw, "reconciliation"), item("Transaction Exceptions", AlertTriangle, "transaction-exceptions"),
    item("Reversals Monitoring", Undo2, "reversals"), item("Transaction Investigation", Search, "transaction-investigation"),
    item("Ledger Monitoring", Database, "ledger"), item("Transaction Reports", FileText, "transaction-reports"),
  ]},
  { id: "risk", title: "Fraud & risk management", items: [
    item("Fraud Monitoring", ShieldAlert, "fraud-monitoring"), item("Anomaly Detection", BrainCircuit, "anomaly-detection"),
    item("Risk Alerts", AlertOctagon, "risk-alerts"), item("Investigation Cases", ListChecks, "investigation-cases"),
    item("Blocked Transactions", Ban, "blocked-transactions"), item("Risk Rules & Policies", SlidersHorizontal, "risk-rules"),
    item("Risk Analytics", ChartLine, "risk-analytics"), item("Fraud Activity History", History, "fraud-history"),
  ]},
  { id: "mpesa", title: "M-Pesa & integrations", items: [
    item("Daraja Integration", Smartphone, "daraja"), item("Connection Health", RadioTower, "connection-health"),
    item("Callback Monitoring", Radio, "callbacks"), item("Synchronization Jobs", RefreshCcw, "sync-jobs"),
    item("Integration Failures", AlertCircle, "integration-failures"), item("Integration Configuration", Settings, "integration-settings"),
  ]},
  { id: "system", title: "System operations", items: [
    item("Infrastructure Overview", Server, "infrastructure"), item("Services & Containers", Container, "services"),
    item("Database Management", Database, "databases"), item("Background Workers", Workflow, "workers"),
    item("Message Queues", Layers, "queues"), item("Performance Monitoring", Gauge, "performance"),
    item("Storage Monitoring", HardDrive, "storage"), item("VPS & Network Health", Cloud, "network"),
    item("System Logs", FileSearch, "system-logs"), item("Backup & Recovery", DatabaseBackup, "backups"),
    item("Deployment & Releases", GitBranch, "deployments"),
  ]},
  { id: "security", title: "Security & access control", items: [
    item("Security Overview", ShieldCheck, "security"), item("Authentication Monitoring", Lock, "authentication"),
    item("MFA Management", Fingerprint, "mfa"), item("Active Sessions & Devices", Monitor, "sessions-devices"),
    item("Secrets & Credential Health", KeyRound, "credential-health"), item("Security Events", ShieldAlert, "security-events"),
    item("Audit Logs", ClipboardList, "audit-logs"), item("Security Incidents", FileWarning, "security-incidents"),
  ]},
  { id: "communications", title: "Communications & notifications", items: [
    item("Email Management", Mail, "email"), item("Email Delivery Logs", Send, "email-delivery"),
    item("Notifications Management", Bell, "notifications"), item("Announcements", Megaphone, "announcements"),
    item("Message Templates", FileText, "message-templates"), item("Delivery Failures", MailWarning, "delivery-failures"),
    item("Notification Subscribers", Users, "notification-subscribers"),
  ]},
  { id: "support", title: "Support & incident management", items: [
    item("Support Center", Headset, "support"), item("Support Tickets", ClipboardCheck, "support-tickets"),
    item("Support Team", UsersRound, "support-team"), item("Incident Management", Siren, "incidents"),
    item("Maintenance Management", CalendarClock, "maintenance"), item("Incident History", FileClock, "incident-history"),
    item("Status Page Management", Radio, "status-page"),
  ]},
  { id: "business", title: "Business management", items: [
    item("Business Overview", BriefcaseBusiness, "business-overview"), item("Customer Management", Users, "customers"),
    item("Customer Relationships", Contact, "customer-relationships"), item("Internal Departments", Building, "departments"),
    item("Administrative Approvals", ClipboardCheck, "approvals"), item("Platform Usage", ChartNoAxesCombined, "platform-usage"),
    item("Service & Plan Management", Package, "service-plans"), item("Business Records", FileText, "business-records"),
  ]},
  { id: "reports", title: "Reporting & compliance", items: [
    item("Reporting Overview", ChartPie, "reports"), item("Operational Reports", ChartLine, "operational-reports"),
    item("Transaction Reports", ArrowLeftRight, "reports-transactions"), item("Compliance Monitoring", ShieldCheck, "compliance"),
    item("Audit Reports", FileText, "audit-reports"), item("Export Center", Download, "exports"),
  ]},
  { id: "configuration", title: "Platform configuration", items: [
    item("General Settings", Settings, "settings"), item("Platform Policies", SlidersHorizontal, "policies"),
    item("Feature Management", Settings2, "features"), item("Domains & Environments", Globe, "domains"),
    item("Alert Configuration", BellRing, "alert-settings"), item("System Change History", History, "change-history"),
  ]},
  { id: "administration", title: "Administration", items: [
    item("My Admin Profile", UserCircle, "my-profile"), item("Admin Roles & Permissions", Shield, "admin-roles"),
    item("Admin Activity", History, "admin-activity"), item("Privileged Access Controls", LockKeyhole, "privileged-access"),
    item("Admin Preferences", Settings2, "admin-preferences"), item("Help & Documentation", CircleHelp, "help"),
  ]},
];

export const allItems = navigation.flatMap(group => group.items);
