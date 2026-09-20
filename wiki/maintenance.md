# Wiki Maintenance

Use the installed `wiki-system` skill's `scripts/wiki` helper (Node.js 22+). Commands below call it `wiki`; run from repository root.

- Starting a website: replace `pages/project-overview.md`, including its summary. Keep only purpose, mental model, and confirmed global constraints.
- Add focused `pages/<subject>.md` only for durable knowledge that takes investigation to reconstruct. Link relevant source files; avoid duplicating code or other pages.
- Each page needs front matter:

```yaml
---
summary: "When an agent should read this page."
---
```

Optional `paths` lists source files/directories whose changes could invalidate the page. Usually omit from overview. For nested branches, create `index.md` with only summary front matter; indexes are generated.

After wiki changes, run `wiki clean wiki`; fix errors and useful warnings. Never hand-edit generated index bodies.

For path-scoped pages, run `wiki audit baseline wiki` once after authoring. Use `wiki audit wiki` to flag changes for review, then `wiki audit mark pages/<subject>.md wiki` after review. Baseline never clears existing warnings. Commit generated `.wiki-system/audit-state.json`; never read or edit it directly.

Copy external evidence into `raw/` as Markdown with summary front matter. Preserve captured bodies; edits require explicit user approval. Record major reasoning in `decision-log.md` only when code and Git history cannot explain it.
