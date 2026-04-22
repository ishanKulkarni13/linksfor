# Backend Architecture Maturity Plan

## Objective

Make backend code enterprise-ready by enforcing thin route handlers, service orchestration, repository abstraction, unified result/error contracts, and domain invariants.

## Scope

This plan targets:

1. Route-handler thinness (transport only).
2. Business logic extraction into application services.
3. DB access through repository interfaces.
4. Unified Result/Error model and API error shape.
5. Domain-level invariants and typed value objects.

## Target Layer Boundaries

1. Interface layer: request parsing, DTO validation, service invocation, response mapping.
2. Application layer: use-case orchestration and policy coordination.
3. Domain layer: entities, value objects, invariants, domain policies.
4. Infrastructure layer: Mongoose repositories, external adapters.

## Step-by-Step Implementation

## Step 1: Route Handler Thinness Contract

Implement rules for migrated handlers:

- No direct Mongoose model imports in interface handlers.
- No ownership/business branching in handlers.
- No raw thrown internal errors returned to clients.

Exit criteria:

- Migrated handlers call only DTO parser + application service + response mapper.

## Step 2: Application Services

Create services by feature verticals:

- `TreeService` (tree profile, links, socials).
- `UserService` (account and identity profile updates).
- `ShareService` (public link resolution and visibility logic).

Service design rules:

- Inputs and outputs are typed.
- Return `Result<T, AppError>` and never transport types.

## Step 3: Repository Interfaces

Create contracts in domain/application boundary:

- `UserRepository`
- `TreeRepository`
- `LinkRepository`

Each repository should expose intention-revealing methods (examples):

- `findById`, `findByUID`, `findByOwner`
- `save`, `delete`, `reorderLinks`, `updateProfile`

Then add infrastructure implementations using Mongoose.

## Step 4: Unified Result + Error Model

Add shared primitives:

- `Result<T, E>` with helpers (`ok`, `err`, `isOk`, `isErr`).
- error taxonomy (`ValidationError`, `AuthError`, `PermissionError`, `NotFoundError`, `ConflictError`, `ExternalServiceError`, `UnexpectedError`).

Add API mapper:

- maps domain/application errors to stable API shape.
- ensures consistent status codes and payload contract.

## Step 5: Domain Invariants and Value Objects

Model key concepts with typed value objects and validation at creation time:

- `UserId`, `TreeId`, `TreeUID`, `LinkUID`
- `TreeVisibility`
- optional `UrlValue` for strict URL normalization

Move core invariants to domain-level logic:

- tree ownership checks
- visibility and lock rules
- constraints for link/social updates

## Migration Strategy

Use vertical-slice migration, not horizontal mass move:

1. pick one flow (example: tree profile read/update)
2. add DTO + service + repository method
3. wire route handler to service
4. remove old direct model logic
5. add tests for slice

## Risks and Mitigations

1. Risk: behavior drift during extraction.
   Mitigation: baseline integration tests per migrated flow.
2. Risk: over-abstraction slows delivery.
   Mitigation: create interfaces only for active domains first.
3. Risk: mixed old/new patterns co-exist too long.
   Mitigation: enforce migration checklist per touched endpoint.

## Definition of Done

A flow is done when:

1. handler is transport-only.
2. business logic is in service/domain.
3. DB access is repository-only.
4. typed Result/Error mapping is used.
5. tests pass for happy and failure paths.

## Suggested Commit Sequence

1. `docs(architecture): add backend architecture maturity implementation plan`
2. `refactor(api): introduce thin handler pattern for first tree slice`
3. `refactor(service): extract tree profile use-case to application layer`
4. `refactor(repo): add tree repository contract and mongoose implementation`
5. `refactor(errors): add unified result and api error mapper`
