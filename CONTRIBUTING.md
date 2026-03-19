# Contributing Guidelines

Thank you for considering contributing to this project!  
We aim to keep the codebase clean, consistent, and easy to collaborate on.

---

## Branching Strategy

We use a simple branching model:

- `main` → stable, production-ready code
- `dev` → development branch (integration of features)

### Rules
- Never push directly to `main`
- Never push directly to `dev`
- Always use Pull Requests (PRs)

---

## Branch Naming Convention

Create branches from `dev` using the following format:

```
feature/<short-description> 
fix/<short-description>
docs/<short-description>
refactor/<short-description>
chore/<short-description>
```

### Examples:

```
feature/matching-algorithm 
fix/login-validation 
docs/update-readme 
refactor/api-structure
chore/setup
```

---

## Workflow

1. Create a new branch from `dev`
2. Make your changes
3. Commit using the commit convention (see below)
4. Push your branch
5. Open a Pull Request → `dev`
6. Get review and approval
7. Merge into `dev`

When a stable version is ready:
- `dev` → merged into `main`

---

## Branch Cleanup (IMPORTANT)

After a branch has been merged:

- The branch should be **deleted**
- This keeps the repository clean and easy to navigate

On GitHub:
- Use the **“Delete branch”** button after merging a PR

### Why?
- Avoid clutter
- Prevent outdated branches
- Keep focus on active work

---

## Commit Convention

We follow a simplified version of **Conventional Commits**.

### Format:

```
type: short description
```

### Allowed types:

```
feat: new feature
fix: bug fix
docs: documentation changes
refactor: code improvements (no new features)
chore: maintenance / setup
```

### Examples:

```
feat: implement matching logic
fix: correct validation bug
docs: update setup instructions
refactor: simplify matching function
chore: add eslint config
```

### Rules:
- Use lowercase
- Keep messages short and clear
- One logical change per commit

---

## Pull Request Guidelines

Before submitting a PR:

- Ensure your code works as expected
- Follow the project structure
- Use correct naming conventions
- Do not include sensitive data (e.g. API keys)

### Review process:
- At least one contributor reviews the PR
- Feedback should be addressed before merging

---

## General Principles

- Keep changes small and focused
- Write readable and maintainable code
- Prefer clarity over cleverness
- Ask questions if unsure

---

## Future Development

This project is designed to be extended.  
Contributors are encouraged to:
- Suggest improvements
- Refactor where needed
- Build upon existing functionality

---

Thank you for contributing 💙