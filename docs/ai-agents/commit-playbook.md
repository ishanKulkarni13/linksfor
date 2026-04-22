# Commit Playbook for Incremental Refactor

## 1. Commit Size

- Maximum target: 1 logical concern per commit.
- Prefer 3 to 15 files per commit for architecture moves.
- Avoid mega commits unless pure mechanical rename with no logic changes.

## 2. Commit Sequencing Strategy

Recommended order within each refactor slice:

1. `docs`: add/adjust architecture notes for the slice.
2. `types`: introduce contracts/DTOs/interfaces.
3. `refactor`: move logic to service/repository layers.
4. `fix`: patch behavior regressions or edge cases.
5. `test`: add/adjust tests for new boundaries.

## 3. Commit Message Templates

## Template A: Refactor

Title:
`refactor(<scope>): <short action>`

Body:
- problem: <what was coupled or duplicated>
- change: <what was extracted/moved/standardized>
- impact: <what is cleaner/safer now>

## Template B: Types

Title:
`types(<scope>): introduce typed <contract name>`

Body:
- add DTO/interface types for <flow>
- enforce typed service boundaries
- reduce runtime ambiguity in <module>

## Template C: Fix

Title:
`fix(<scope>): handle <failure mode>`

Body:
- guard <error/null/edge case>
- standardize response for <scenario>
- prevent regression in <flow>

## 4. Quality Checklist Before Suggesting Commit

1. No unrelated edits in staged scope.
2. No mixed formatting-only noise unless intentional.
3. No architecture rule violations introduced.
4. Build/lint checks pass for touched slice where feasible.
5. Commit message explains why, not only what.

## 5. Example Commit Titles for Upcoming Work

1. `docs(architecture): define target layered boundaries and migration phases`
2. `refactor(auth): add provider-agnostic auth context contract`
3. `types(api): add tree profile request and response DTOs`
4. `refactor(tree): extract ownership checks into tree service`
5. `refactor(data): introduce tree repository interface and mongoose implementation`
6. `fix(api): normalize auth failure and not-found response contracts`
