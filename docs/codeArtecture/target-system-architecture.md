# Target System Architecture

## 1. Architecture Style

Layered clean architecture with explicit dependency direction:

- Interface -> Application -> Domain
- Infrastructure implements Domain/Application contracts
- Domain never imports framework or transport details

## 2. Layer Responsibilities

### Interface Layer

Responsibilities:
- Accept HTTP requests.
- Validate and map request DTOs.
- Invoke application services.
- Map service results to HTTP responses.

Allowed imports:
- Application services
- DTO schemas/types
- shared error mappers

Forbidden:
- Direct model queries
- Business rule branching

### Application Layer

Responsibilities:
- Orchestrate use cases.
- Handle authorization policies through abstractions.
- Coordinate repositories and domain services.

Allowed imports:
- Domain entities/services/contracts
- Shared result/error contracts

Forbidden:
- HTTP request/response primitives
- Framework-specific session APIs

### Domain Layer

Responsibilities:
- Core business invariants.
- Aggregate behavior.
- Value objects and domain policies.

Allowed imports:
- Language/runtime primitives only

Forbidden:
- Next.js, Express, Mongoose, auth providers

### Infrastructure Layer

Responsibilities:
- Mongoose repository implementations.
- Auth provider adapters (Auth.js and later Better Auth).
- Cloudinary/external integrations.

Allowed imports:
- Domain contracts
- Application contracts

## 3. Proposed Folder Map

```text
src/
  interface/
    http/
      routes/
      middleware/
      dto/
  application/
    services/
    use-cases/
    contracts/
  domain/
    entities/
    value-objects/
    services/
    repositories/
  infrastructure/
    persistence/
    repositories/
    auth/
    external/
  shared/
    types/
    errors/
    result/
    utils/
```

## 4. Authentication Abstraction Contract

Core idea: all auth access flows through a single port.

Example contract concept:

- `getSessionContext()`
- `requireAuthenticatedUser()`
- `beginSignIn(provider, options)`
- `performSignOut()`

Auth implementations:
- `AuthJsAdapter` (current)
- `BetterAuthAdapter` (future)

Result:
- Application and interface layers remain stable during provider switch.

## 5. Repository and Service Contracts

Repository interfaces (domain-facing):
- `UserRepository`
- `TreeRepository`
- `LinkRepository`

Service concepts (application-facing):
- `TreeService` for tree/profile/link/social workflows.
- `UserService` for account/profile flows.
- `ShareService` for public link resolution logic.

## 6. Type Safety Model

1. DTO types inferred from validation schemas.
2. No untyped `req.json()` access in migrated handlers.
3. All service inputs/outputs typed.
4. Shared `Result<T, E>` style return contracts.
5. Domain IDs and key fields typed with branded/string-safe types where useful.

## 7. Error Strategy

Use a consistent error taxonomy:

- ValidationError
- AuthError
- PermissionError
- NotFoundError
- ConflictError
- ExternalServiceError
- UnexpectedError

Each error maps deterministically to HTTP response shape and status code.

## 8. Express Portability Strategy

To move to Express later:

1. Keep use-cases and domain logic transport-agnostic.
2. Replace interface adapters (Next route handlers -> Express controllers).
3. Reuse same application services and repositories.
4. Keep auth adapter contract; swap session extraction implementation for Express middleware.

## 9. Anti-Patterns to Avoid

1. Direct Mongoose calls in route handlers.
2. Provider-specific auth checks spread across files.
3. Duplicated ownership and permission logic.
4. Untyped request payload destructuring.
5. Returning raw internal error messages to clients.
