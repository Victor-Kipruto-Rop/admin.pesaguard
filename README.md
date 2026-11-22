# PesaGuard Super Admin

Private platform administration frontend for PesaGuard, intended for `admin.pesaguard.co.ke`.

## Current implementation

- React 19 + TypeScript + Vite.
- Responsive light-theme admin shell with collapsible navigation.
- Fourteen navigation groups covering overview, organizations, users, transaction operations, fraud/risk, M-Pesa, infrastructure, security, communications, support, business management, reporting, platform configuration and administration.
- Global page search (`Ctrl/Cmd + K`) and sidebar page filtering.
- API client with cookie credentials and configurable API base URL.
- Dashboard and resource views deliberately display empty/unverified states until protected backend endpoints return real data. No fabricated operational metrics or sample customer records are presented.
- No developer portal, API-key management, or developer documentation navigation.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_ADMIN_API_BASE_URL` to the PesaGuard API origin. Vite variables are public browser configuration and must never contain secrets.

## Backend integration contract

The frontend currently expects these protected endpoints:

- `GET /livez` for basic API reachability.
- `GET /api/v1/admin/overview` for dashboard summary.
- `GET /api/v1/admin/{resource_slug}` for resource lists, returning `{ "items": [], "total": 0 }`.

These are integration contracts, not a claim that the current API already implements them. Before production, implement and verify the matching endpoints in `api.pesaguard`, enforce platform-admin authorization server-side, scope tenant data explicitly, and add audited mutation endpoints for approved actions. Never trust frontend role checks.

## Build

```bash
npm run typecheck
npm run build
```

## Deployment

Build with Node 22+ and serve the generated `dist/` directory with Nginx. A sample container and Nginx configuration will be added as deployment integration is finalized.

## Security requirements

- Use secure, HttpOnly, SameSite cookies for admin sessions.
- Require MFA for privileged administrators.
- Enforce RBAC and tenant scoping on every backend endpoint.
- Record immutable audit events for privileged reads and all mutations where required.
- Use step-up authentication and explicit confirmation for high-impact actions.
- Do not expose secrets, payment credentials, or raw customer-sensitive payloads in the browser.
- Do not perform money movement, settlement, refund or ledger mutation from this console.
