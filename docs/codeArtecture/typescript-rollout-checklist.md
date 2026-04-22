# TypeScript Rollout Checklist

Use this checklist for each vertical migration slice.

## A. Boundary Typing

1. Route/controller request DTO is typed.
2. Response DTO is typed.
3. Service input/output types are explicit.
4. Repository method signatures are explicit.

## B. Validation and Inference

1. Input schema validates runtime payload.
2. Type is inferred from schema where applicable.
3. No untyped `req.json()` destructuring in migrated files.

## C. Type Safety Rules

1. No implicit `any`.
2. No unsafe cast without documented reason.
3. Narrow `unknown` before usage.
4. Exported functions have explicit types.

## D. Shared Utility Type Adoption

1. Use shared `Result` type.
2. Use shared API success/failure envelope types.
3. Use shared identifier types (user/tree/link ids).
4. Use shared auth/session context types.

## E. Slice Completion Gate

1. `tsc --noEmit` passes.
2. Lint passes with type-focused rules.
3. Tests for migrated flow pass.
4. Old untyped duplicate path is removed or marked for next planned slice.
