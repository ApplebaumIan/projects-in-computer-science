# Issue → Project script

This repo includes a tiny script `scripts/issue-to-project.js` used by a GitHub Actions workflow to convert a labeled issue into a single JSON file under `documentation/src/data/projects/`.

Quick local test

1. Create a local `issue.txt` file with the issue body matching `.github/ISSUE_TEMPLATE/add-project.md`.
2. Run:

```bash
node scripts/issue-to-project.js --input-file issue.txt --outdir documentation/src/data/projects --dry-run
```

This prints the JSON that would be written.

To actually write the file, omit `--dry-run` and ensure the `documentation/src/data/projects/` directory exists.

