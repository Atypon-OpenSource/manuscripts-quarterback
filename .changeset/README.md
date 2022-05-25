# Changesets

[Changesets](https://github.com/changesets/changesets) is a library to author changes for multiple packages at once without additional work. It automates the bumping of versions between dependent packages in a monorepo as well as generates CHANGELOGs automatically based on the changesets. It does involve an additional step for releasing changes but using it is pretty straightforward. https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md

## Normal workflow

1. Make changes inside a new branch (`git checkout -b`)
2. Write commit messages using [Conventional Commits](https://www.conventionalcommits.org)
3. For each independent fix or functionality, run `pnpm cs` before commiting
4. Follow the terminal wizard, pick the changed packages and follow [Semantic versioning](https://semver.org/) to bump the versions. This should create markdown files with your changes inside `.changeset`
5. `git push -u origin <your branch>` your changes and create a PR
6. Once tests pass and PR is approved, merge the PR
7. This is where it gets a little complicated. Github action should automatically create a new PR with a name `chore(changeset): version update`. You can include multiple merged PRs & changesets in this PR. All it includes is the result of executing `changeset version` which removes the .md files, updates the `package.json` versions and CHANGELOGs. It can be run manually if needed, Github action just removes this extra step. Once ready for deployment, merge the PR and the CI should publish the new versions.
