# Observability and Operability Plan

## Objective

Make the platform production-operable with structured logging, traceability, alerting, SLOs, and runbooks so incidents are detectable, diagnosable, and recoverable quickly.

## Scope

This plan targets:

1. Structured logs with correlation/request id.
2. Error tracking and alerting with ownership routing.
3. Basic tracing for auth, API, and DB latency.
4. SLOs for availability and latency on core endpoints.
5. Incident runbooks for known failure modes.

## Pillar 1: Structured Logging

Requirements:

1. every request gets a correlation id.
2. all logs are structured JSON in server context.
3. logs include event name, severity, timestamp, route, user context (safe), and latency.
4. avoid logging secrets and PII.

Baseline events to capture:

- auth start/success/failure
- API handler success/failure
- DB query latency warning thresholds
- external service errors (Cloudinary/auth providers)

## Pillar 2: Error Tracking and Alerting

Requirements:

1. central error ingestion for unhandled exceptions and critical handled failures.
2. route alerts to ownership groups by domain (auth, api, db, infra).
3. deduplicate noisy errors and track regression spikes.

Alert severity:

- P1: login outage, public page outage, DB unavailable
- P2: degraded create/update flows
- P3: non-critical feature errors

## Pillar 3: Tracing and Latency

Requirements:

1. basic spans for request lifecycle.
2. measure auth latency, route latency, and DB call latency.
3. include correlation id in logs and traces.

Initial trace targets:

- login flow
- tree profile fetch/update
- link add/edit/delete
- public tree render data fetch

## Pillar 4: SLOs and Error Budgets

Define initial SLOs for core journeys:

1. API availability SLO.
2. p95 latency SLO for core endpoints.
3. auth success-rate SLO.

Each SLO should include:

- indicator definition
- objective target
- measurement window
- owner
- escalation path

## Pillar 5: Runbooks

Create operational runbooks for:

1. auth failures and OAuth callback issues
2. DB connectivity and latency spikes
3. external dependency failures
4. elevated 5xx rates
5. deployment rollback steps

Runbook template:

- symptoms
- detection query/dashboards
- immediate actions
- mitigation paths
- rollback criteria
- post-incident follow-up checklist

## Rollout Strategy

1. Phase A: structured logging + request id baseline.
2. Phase B: error tracking and alert routing.
3. Phase C: tracing for top critical flows.
4. Phase D: SLO dashboards and error budgets.
5. Phase E: runbook completion and incident drills.

## Definition of Done

Observability baseline is ready when:

1. every critical request has correlation id and structured logs.
2. critical errors trigger actionable alerts.
3. auth/API/DB latency trends are measurable.
4. SLO dashboards exist and are owned.
5. runbooks exist for top production incidents.

## Suggested Commit Sequence

1. `docs(operations): add observability and operability implementation plan`
2. `chore(logging): introduce structured logger and request id middleware`
3. `chore(monitoring): integrate error tracking and ownership routing`
4. `perf(tracing): add basic auth api and db trace spans`
5. `docs(operations): define slos and incident runbooks`
