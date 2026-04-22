# Linksfor Refactor Docs

This folder is the source of truth for the enterprise refactor.

## Documentation Map

- `codeArtecture/enterprise-refactor-roadmap.md`
  - End-to-end phased roadmap, goals, priorities, risks, and research tracks.
- `codeArtecture/target-system-architecture.md`
  - Target layered architecture for portability (Next.js now, Express-ready later).
- `ai-agents/agent-operating-manual.md`
  - Execution instructions for AI agents and contributors.
- `ai-agents/commit-playbook.md`
  - Atomic commit strategy, commit message format, and sequencing rules.

## Operating Principles

1. Refactor in small slices, not a big-bang rewrite.
2. Keep production behavior stable while internals are modernized.
3. Protect quality with typed boundaries, validation, tests, and code review checks.
4. Preserve framework portability by separating transport from business logic.
