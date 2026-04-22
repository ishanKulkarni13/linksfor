# Linksfor Refactor Docs

This folder is the source of truth for the enterprise refactor.

## Documentation Map

- `codeArtecture/enterprise-refactor-roadmap.md`
  - End-to-end phased roadmap, goals, priorities, risks, and research tracks.
- `codeArtecture/target-system-architecture.md`
  - Target layered architecture for portability (Next.js now, Express-ready later).
- `codeArtecture/backend-architecture-maturity.md`
  - Future implementation plan for service/repository layering, thin handlers, and unified errors/results.
- `codeArtecture/typescript-maturity.md`
  - Future implementation plan for strict TypeScript, schema-inferred DTOs, and CI type gates.
- `codeArtecture/observability-operability.md`
  - Future implementation plan for logs, tracing, alerts, SLOs, and incident runbooks.
- `ai-agents/agent-operating-manual.md`
  - Execution instructions for AI agents and contributors.
- `ai-agents/commit-playbook.md`
  - Atomic commit strategy, commit message format, and sequencing rules.

## Operating Principles

1. Refactor in small slices, not a big-bang rewrite.
2. Keep production behavior stable while internals are modernized.
3. Protect quality with typed boundaries, validation, tests, and code review checks.
4. Preserve framework portability by separating transport from business logic.
