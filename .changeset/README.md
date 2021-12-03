# Changesets

## Workflow

The following workflow describes the steps needed to release new versions. It makes management & versioning of /packages easier

1. `git pull && git checkout -b`
2. make changes & commit changes
4. run: `pnpm changeset`
5. follow the wizard (choose changed packages, version change, write description of the change)
6. `git add . && git commit && git push origin` (create PR-1)
7. merge PR-1 (Github action triggers which creates a new PR-2, including changeset generated CHANGELOG, version updates)
8. merge PR-2 (Github action triggers which publishes all changed packages)

Github actions:

* [after merging PR-1](../.github/workflows/version.yml) 
* [after merging PR-2](../.github/workflows/publish.yml)
