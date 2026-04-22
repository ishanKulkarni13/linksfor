# Error Handling and API Response Contract

## Objective

Define one enterprise-grade error and response standard used by all backend endpoints and frontend consumers.

## Goals

1. Consistent custom error codes across the product.
2. Predictable API success and failure envelopes.
3. One centralized HTTP status mapping policy.
4. Strong type-safe contracts for errors and responses.
5. Traceable failures via request correlation id.

## Canonical Error Code Enum

Use a stable code system that is product-owned and immutable after release.

## Auth codes

- AUTH_UNAUTHENTICATED
- AUTH_FORBIDDEN
- AUTH_TOKEN_INVALID

## Validation codes

- VALIDATION_FAILED
- VALIDATION_MISSING_FIELD
- VALIDATION_INVALID_FORMAT

## Resource codes

- RESOURCE_NOT_FOUND
- RESOURCE_CONFLICT
- RESOURCE_ALREADY_EXISTS

## Domain codes

- TREE_OWNERSHIP_REQUIRED
- TREE_LOCKED
- LINK_LIMIT_EXCEEDED

## External codes

- EXTERNAL_DB_UNAVAILABLE
- EXTERNAL_CLOUDINARY_FAILED
- EXTERNAL_AUTH_PROVIDER_FAILED

## System codes

- SYSTEM_TIMEOUT
- SYSTEM_RATE_LIMITED
- SYSTEM_INTERNAL_ERROR

## Error Model

Every app-level error should follow one base shape:

1. code
2. message
3. details (optional)
4. httpStatus
5. retryable (boolean)

Notes:

- `message` must be safe to expose to API clients.
- internal `cause` can exist in code but must not be leaked in API payloads.

## API Response Envelope

## Success response

```json
{
  "success": true,
  "data": {},
  "meta": {},
  "requestId": "req_abc123",
  "timestamp": "2026-04-23T10:00:00.000Z"
}
```

## Failure response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid input",
    "details": {}
  },
  "requestId": "req_abc123",
  "timestamp": "2026-04-23T10:00:00.000Z"
}
```

## HTTP Mapping Policy

Map error codes centrally, not in each route handler.

1. AUTH_UNAUTHENTICATED -> 401
2. AUTH_FORBIDDEN -> 403
3. VALIDATION_* -> 400
4. RESOURCE_NOT_FOUND -> 404
5. RESOURCE_CONFLICT and RESOURCE_ALREADY_EXISTS -> 409
6. SYSTEM_RATE_LIMITED -> 429
7. EXTERNAL_* -> 502 or 503
8. SYSTEM_INTERNAL_ERROR -> 500

## Logging and Correlation

Every failure log should include:

1. requestId
2. errorCode
3. route
4. userId if available
5. latencyMs
6. severity

Rule:

- The error code in logs must match the error code in API response.

## Frontend Handling Contract

UI behavior should be code-family driven:

1. AUTH_* -> login flow or forbidden state
2. VALIDATION_* -> inline field/form errors
3. RESOURCE_* -> not found/conflict UX
4. EXTERNAL_* or SYSTEM_* -> retry and fallback messaging

## Implementation Sequence

1. Define shared enum and base error types.
2. Define shared API envelope types.
3. Add centralized error-to-http mapper.
4. Migrate 2-3 critical endpoints first.
5. Add frontend error parser by code family.
6. Roll out by vertical slices.

## Definition of Done

A migrated endpoint is done when:

1. it returns only standardized success/failure envelopes.
2. it uses canonical error codes.
3. it uses centralized status mapping.
4. it includes requestId in both success and failure responses.
5. it does not return raw internal exception details.

## Commit Message Pattern

Use this format while implementing:

- `type(domain): msg`

Examples:

- `types(shared): add canonical error code enum and error contracts`
- `refactor(api): adopt standardized response envelope in tree profile routes`
- `fix(error): map auth and validation failures to canonical error codes`
