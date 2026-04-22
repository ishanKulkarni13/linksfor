# Linksfor Enterprise Refactor Roadmap

## 1. Vision

Transform Linksfor from an early-stage learning codebase into a maintainable, enterprise-grade platform with:

- Strong architectural boundaries.
- Flexible authentication provider integration.
- Strict TypeScript safety.
- Predictable data/state management.
- Incremental delivery with small safe commits.

## 2. Non-Negotiable Constraints

1. Keep current user-facing behavior stable while refactoring internals.
2. Refactor incrementally; no destructive big-bang rewrite.
3. Every change is atomic and commit-ready.
4. Backend logic must be portable to Express later.
5. Authentication must stay provider-swappable (Auth.js now, Better Auth later).

## 3. Current-State Quality Assessment

### High-level rating

- Architecture maturity: 3.5/10
- Type safety maturity: 3/10
- Security/reliability hygiene: 4/10
- Testability: 2/10
- Maintainability: 4/10

### Why this rating

- Business logic and HTTP concerns are tightly coupled in route handlers.
- Heavy JS usage with limited typed contracts.
- Duplicated auth/ownership checks and inconsistent error handling.
- Direct model access in handlers and server actions.
- Minimal centralized validation and no strong service/repository boundary.

## 4. Target Goals

### Goal A: Architecture

Adopt layered architecture:

- Interface layer: route handlers/controllers only.
- Application layer: use-case orchestration.
- Domain layer: core business logic.
- Infrastructure layer: DB/auth/cloud integrations.

### Goal B: Auth Flexibility

Introduce auth ports/adapters so provider swap does not force global rewrites.

### Goal C: Type Safety

Move to strict TypeScript with strong DTOs, domain types, repository contracts, and utility types.

### Goal D: Maintainability

Reduce duplication, standardize errors/validation, and enforce architecture boundaries.

### Goal E: Performance and Stability

Optimize fetch/state flow, remove redundant logic, and add observability and regression checks.

## 5. Phased Execution Plan

### Phase 0 - Rules and Baseline

- Define architecture boundaries and naming conventions.
- Define commit strategy and code quality gates.
- Add docs and decision log.

Exit criteria:
- Refactor rules documented.
- Team/agents aligned on layers and boundaries.

### Phase 1 - Security and Reliability Stabilization

- Fix critical auth/session null-check paths.
- Normalize error responses.
- Add basic request input validation baseline.
- Remove unsafe patterns and dead dev paths.

Exit criteria:
- Critical runtime and security hazards resolved.
- Protected routes fail safely and consistently.

### Phase 2 - Auth Portability Layer

- Create auth abstraction contract (session access, user identity, sign-in/out triggers).
- Replace direct provider calls in app code with boundary APIs.
- Keep Auth.js implementation under adapter.

Exit criteria:
- Route/service code no longer depends on provider-specific APIs directly.

### Phase 3 - Backend Layering (Repo + Service)

- Extract business logic from route handlers to services.
- Introduce repository interfaces and implementations.
- Route handlers become thin transport adapters.

Exit criteria:
- No direct model queries in interface handlers for migrated slices.

### Phase 4 - TypeScript Hardening

- Convert by vertical slices to TS.
- Add typed DTOs for inputs/outputs.
- Standardize shared types and utility modules.
- Enforce strict compiler/lint rules for migrated files.

Exit criteria:
- New and migrated slices compile with strict type checks.

### Phase 5 - State and Data Strategy Modernization

- Use TanStack Query for server state.
- Use Zustand for local app/workflow state only.
- Remove duplicated fetch logic and fragmented localStorage orchestration.

Exit criteria:
- Deterministic state model and reduced data-fetch duplication.

### Phase 6 - Performance and Observability

- Add structured logging and error instrumentation.
- Add key performance budgets and profiling checkpoints.

Exit criteria:
- Measurable baselines and no hidden regressions.

### Phase 7 - Framework and Dependency Modernization

- Upgrade Next.js and critical libs in controlled increments.
- Validate compatibility with architecture boundaries.

Exit criteria:
- Stable app on modern stack with test-backed confidence.

### Phase 8 - Better Auth Integration

- Implement Better Auth adapter behind the auth boundary.
- Migrate provider integration without rewriting application/domain layers.

Exit criteria:
- Provider swap completed with existing behavior preserved.

### Phase 9 - Governance and Scale

- Add CI quality gates, architecture checks, and standards enforcement.
- Maintain ADRs and coding standards for long-term growth.

Exit criteria:
- Quality system prevents architectural drift.

## 6. Improvement Backlog (Major)

1. Centralized request validation strategy.
2. Centralized error and result handling abstraction.
3. Repository pattern with interfaces for all core aggregates.
4. Auth/authorization guard abstraction.
5. Removal of framework leakage from domain and application logic.
6. Typed API client strategy for frontend.
7. Test strategy: unit + integration + e2e.
8. Observability baseline (error tracking + request tracing).

## 7. Research Tracks Required

1. Better Auth migration model and session mapping strategy.
2. Next.js App Router server boundaries and best practices for clean architecture.
3. TanStack Query + Zustand coexistence patterns.
4. DTO validation approach (Zod-first with inferred TS types).
5. Repository and transaction strategy with Mongoose.
6. Error taxonomy and API error contract design.

## 8. Commit Discipline

1. One concern per commit.
2. No mixed refactor + feature + formatting in one commit.
3. Keep commits reversible and reviewable.
4. Include why and risk in commit body for architectural changes.

Recommended commit title style:
- `refactor(layer): extract tree ownership checks into service`
- `chore(auth): introduce auth provider adapter contract`
- `types(api): add typed tree profile DTOs`

## 9. Definition of Success

The project is considered enterprise-ready when:

- Core business behavior is decoupled from Next.js and auth provider specifics.
- The majority of application logic is strictly typed.
- New features can be added through predictable layer boundaries.
- Regression risk is controlled with consistent validation, tests, and observability.
