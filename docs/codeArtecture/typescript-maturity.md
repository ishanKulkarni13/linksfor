# TypeScript Maturity Plan

## Objective

Achieve enterprise-grade type safety through vertical-slice migration, strong DTO schemas, shared utility types, and CI-enforced type quality gates.

## Scope

This plan targets:

1. Vertical TS migration by feature slices.
2. Elimination of implicit `any` in migrated modules.
3. Strong DTO schemas with inferred types.
4. Shared utility types for result, pagination, ids, and auth context.
5. Type-focused lint and CI gates.

## Migration Principles

1. Migrate by domain flow, not by extension-only sweeps.
2. Type boundaries first (DTOs, services, repositories).
3. Keep old JS paths functional while replacing slice by slice.
4. Avoid temporary `any` debt in migrated files.

## Implementation Steps

## Step 1: Type Boundary Baseline

Add typed contracts for each migrated flow:

- request DTO
- response DTO
- service input/output
- repository input/output

Rule: no untyped `req.json()` usage in migrated handlers.

## Step 2: Schema-First DTO Validation

Adopt schema-first validation for boundary inputs and derive TS types from schema:

- parse and validate at interface boundary
- pass validated typed object to service

Expected outcome:

- runtime validation + compile-time type safety

## Step 3: Shared Type Utilities

Add shared type primitives:

- `ApiSuccess<T>` / `ApiFailure`
- `Result<T, E>`
- `Paginated<T>`
- typed identifiers (`UserId`, `TreeId`, `TreeUID`, `LinkUID`)
- `AuthContext` and `SessionContext`

## Step 4: Strictness and Lint Rules

Evolve strictness in controlled stages:

1. no implicit any for migrated modules
2. no unsafe `unknown` consumption without narrowing
3. no untyped exported functions in migrated modules
4. fail CI on TS regressions

## Step 5: Vertical Slice Playbook

For each slice:

1. convert route handler to `.ts`
2. add DTO schema and inferred types
3. add typed service contract
4. add typed repository methods
5. update tests and compile checks

## Type Quality Checklist

A migrated module is acceptable only if:

1. exported APIs are explicitly typed.
2. external input is schema-validated.
3. no implicit any.
4. no `as` casting shortcuts without documented reason.
5. type errors are zero for the touched slice.

## Risks and Mitigations

1. Risk: migration churn slows feature delivery.
   Mitigation: vertical slices and strict scope per PR.
2. Risk: type assertions hide real issues.
   Mitigation: lint rule for unsafe assertions + code review checklist.
3. Risk: duplicate types across modules.
   Mitigation: centralized shared type modules and import conventions.

## Definition of Done

A slice is done when:

1. handler, service, and repository boundary types are explicit.
2. DTO schema validation exists.
3. TS compile passes with no regressions.
4. lint checks pass for type safety rules.

## Suggested Commit Sequence

1. `docs(typescript): add type safety maturity implementation plan`
2. `types(shared): introduce result api and id utility types`
3. `types(api): add inferred dto schemas for first migrated flow`
4. `refactor(ts): migrate first route-service-repo vertical slice to typescript`
5. `chore(ci): enforce type-check and type-focused lint gates`
