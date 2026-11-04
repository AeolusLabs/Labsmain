# Promote the simpler website to main

Owner requested replacing main with the simple Codex site while keeping the old site for easy restoration.

Source: codex/minimal-redesign at 256f448. Main was fast-forwarded from 5592fa6; no history was rewritten.

Backups pushed and remote hashes checked before updating main:
- backup/main-before-minimal-2026-11-04: 5592fa6509f540d607a3e6fa4e7abafe87c1582c (exact previous main).
- codex/brief-assistant: f874230596d062376f862bf7ccf8b93545eb00b8 (previous uncommitted chat work, saved separately).

Verification: pnpm build and pnpm typecheck exited 0 on the simple version. Production HTTP smoke checks at localhost:3132 returned 200 for home, contact, about, solutions, work, both case studies and privacy; home contains Make room. Before this documentation addition, git diff between main and origin/codex/minimal-redesign was empty.

Restore by creating a new commit on main with the saved backup branch's tree, then push normally. The backup branch remains on GitHub. Do not force-push main to restore it.

Live hosting deployment is not verified by the local checks. Chat stays on its separate branch for future integration.
