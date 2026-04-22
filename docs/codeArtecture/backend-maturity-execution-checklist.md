# Backend Maturity Execution Checklist

Use this checklist when implementing backend architecture maturity work.

## A. Thin Handler Migration Checklist

1. Handler imports no Mongoose model directly.
2. Request body is validated at boundary.
3. Handler calls exactly one application service entrypoint.
4. Response mapping uses standardized API shape.
5. No domain business branching in handler.

## B. Service Extraction Checklist

1. Use-case function has explicit typed input/output.
2. Authorization/ownership logic is centralized in service/domain.
3. No transport-specific types in service signature.
4. Service returns `Result<T, AppError>`.

## C. Repository Abstraction Checklist

1. Interface exists before implementation migration.
2. Method names are intention-revealing.
3. No route/service directly references Mongoose methods.
4. Repository implementation mapped in infrastructure layer.

## D. Error/Result Standardization Checklist

1. Error taxonomy used (Validation/Auth/Permission/NotFound/Conflict/External/Unexpected).
2. API error mapper applied consistently.
3. No raw internal exception returned to client.

## E. Slice Completion Gate

1. Build passes.
2. Type checks pass for touched modules.
3. Unit/integration tests for migrated flow pass.
4. Legacy duplicate logic removed.
