# AI Agent Operating Manual for Linksfor Refactor

## 1. Mission

Refactor the codebase incrementally into a portable, type-safe, enterprise-grade architecture while keeping behavior stable.

## 2. Mandatory Working Rules

1. Make only small, atomic changes.
2. Keep one concern per change.
3. Never mix architecture shifts with unrelated styling or content edits.
4. Do not bypass architecture boundaries for short-term convenience.
5. Preserve runtime behavior unless the task explicitly requests behavior change.

## 3. Architecture Guardrails

1. Interface handlers map transport <-> DTO only.
2. Business logic lives in application/domain layers.
3. Data access only through repositories.
4. Auth access only through auth abstraction layer.
5. Shared utility and types go to shared modules, not duplicated in feature folders.

## 4. Type Safety Guardrails

1. New or migrated code must be TypeScript.
2. Avoid `any`; use explicit types or generics.
3. No untyped request body destructuring.
4. Validate external input with schema-first approach.
5. Keep type contracts at boundaries first (DTOs, service inputs/outputs).

## 5. Commit Workflow Rules

The user performs git add/commit manually. Agent must always provide:

1. What changed.
2. Why it changed.
3. Exact commit message suggestion.

Commit message format:

- Title: `<type>(<scope>): <action>`
- Body bullets:
  - context/problem
  - what changed
  - expected impact

Types allowed:
- `refactor`, `fix`, `feat`, `types`, `chore`, `docs`, `test`, `perf`

## 6. Definition of Done for Each Change

1. Change follows target layer boundary.
2. Types and validation are correct for new boundary.
3. Error paths are handled consistently.
4. Existing behavior verified for touched flow.
5. Suggested commit message included in final response.

## 7. Do and Do Not

Do:
1. Prefer extraction over rewrites.
2. Add adapter contracts before swapping implementations.
3. Replace duplicated logic with shared services.
4. Keep docs updated when architecture decisions change.

Do not:
1. Introduce new framework coupling in domain logic.
2. Add hidden global state for convenience.
3. Return raw internal exceptions to API consumers.
4. Introduce temporary hacks without a tracked follow-up.

## 8. Prioritization Order

1. Security and reliability blockers.
2. Auth abstraction and boundary setup.
3. Service/repository extraction.
4. Type contracts and validation hardening.
5. State/data flow modernization.
6. Performance and observability improvements.
