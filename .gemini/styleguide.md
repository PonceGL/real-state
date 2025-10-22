# Real Estate Application Style Guide

## 1\. Core Principles & Language Configuration

This document outlines the coding conventions for our TypeScript, React, and Next.js codebase. The goal is to ensure our code is readable, maintainable, consistent, and performant.

**IMPORTANT RULE:** All your responses, code review comments, and suggestions **must be in Spanish (`es-MX`)**. This is a strict requirement for all contributions.

---

## 2\. Module Imports and Exports

To maintain a consistent and logical structure, this project uses the `eslint-plugin-simple-import-sort` plugin to automatically format all module imports and exports. The linter will enforce these rules, so it's important to understand how it works.

### Imports

The plugin automatically groups imports and sorts them alphabetically within each group. The groups are always separated by a blank line and follow this specific order:

1.  **Packages**: All imports from third-party libraries (e.g., `react`, `zod`). Imports starting with `@` come first.
2.  **Absolute / Aliased Imports**: Any import that is not a package and starts with an alias (e.g., `@/components/...`).
3.  **Relative Imports**: Imports from other files within the same module, starting with `../` (further away) or `./` (closer).
4.  **Side-effect Imports**: Any module imported solely for its side effects, like a global CSS file. This group always goes last.

**Example of Auto-Sorting in Action:**

If you write this unsorted code:

```typescript
import { style } from './style';
import { Button } from '@/components/button';
import { OtherComponent } from '../other-component';
import React from 'react';
import './globals.css';
import { z } from 'zod';
```

When you save, the linter will automatically reformat it to:

```typescript
import React from 'react';
import { z } from 'zod';

import { Button } from '@/components/button';

import { OtherComponent } from '../other-component';
import { style } from './style';

import './globals.css';
```

### Exports

For files that re-export modules (like an `index.ts` barrel file), the plugin enforces a simple **alphabetical sort order** based on the file path.

**✅ Correct Sorted Exports:**

```typescript
export * from './button'; // 'b'
export * from './card';   // 'c'
export * from './input';  // 'i'
```

---

## 3\. Naming Conventions

Consistency in naming is critical for readability.

- **Variables & Functions:** Use **lowerCamelCase**.
  - _Examples:_ `userName`, `totalCount`, `calculatePrice()`
- **Constants:** Use **UPPER_SNAKE_CASE** for constant values that are hardcoded and reused.
  - _Examples:_ `MAX_LOGIN_ATTEMPTS`, `API_BASE_URL`
- **Classes & Types/Interfaces:** Use **PascalCase** (also known as UpperCamelCase).
  - _Examples:_ `class UserManager { ... }`, `type UserProfile = { ... }`
- **React Components:** Use **PascalCase**. This is a strict React convention.
  - _Examples:_ `function UserAvatar() { ... }`, `const LoginForm = () => { ... }`

---

## 4\. Project Structure & Routing (Next.js 15 App Router)

### Directory Structure inside `src/app`

The `src/app` directory should primarily contain routes. Core files required by Next.js are exceptions.

- **Allowed root files:** `layout.tsx`, `globals.css`, `robots.ts`, `sitemap.ts`, `not-found.tsx`, and their respective tests.
- **Public Routes:** All page-generating public routes must be inside the `src/app/(public)/` route group.
- **Admin/Private Routes:** All page-generating private/admin routes must be inside the `src/app/(admin)/` route group.
- **API Routes:** All API endpoints must be inside the `src/app/api/` directory.

### Route Naming and File Structure

- **Route Segment Naming:** URL segments must be named using **kebab-case** (lowercase, dash-separated). This is for URL consistency and to avoid case-sensitivity issues.
  - **✅ Correct:** `src/app/(public)/contact-us/page.tsx` -\> `/contact-us`
  - **❌ Incorrect:** `src/app/(public)/contactUs/page.tsx`
- **File Structure:** Every route that renders a page must be a folder containing a `page.tsx` file.
  - **✅ Correct:** `src/app/(public)/about/page.tsx`
  - **❌ Incorrect:** `src/app/(public)/about.tsx`

### Reference: Official Next.js 15 Conventions

The project adheres to the standard file conventions for the Next.js 15 App Router.

| File Convention | Purpose                                   |
| --------------- | ----------------------------------------- |
| `layout.tsx`    | Shared UI (Header, Footer, Nav)           |
| `page.tsx`      | The unique UI of a route, makes it public |
| `loading.tsx`   | Loading UI (React Suspense Boundary)      |
| `not-found.tsx` | Not Found UI                              |
| `error.tsx`     | Error UI (React Error Boundary)           |
| `route.ts`      | API Endpoint                              |

**Route Groups:** Folders wrapped in parentheses, like `(public)`, are used for organization and **do not** affect the URL path.

**Private Folders:** Folders prefixed with an underscore, like `_components`, are for colocation of files and are **not routable**.

---

## 5\. Code Comments

Comments should be clear, concise, and provide value.

- **Single-line comments:** Avoid them unless they are for `TODO` items. The format must be `// TODO: message`.
- **JSDoc/TSDoc:** All reusable classes, functions, hooks, and complex components **must** include JSDoc comments. The comment block should specify parameters (`@param`), what the function returns (`@returns`), and an example of usage (`@example`).

**✅ Correct JSDoc Example:**

```typescript
/**
 * Calculates the total price including tax.
 *
 * @param price The base price of the item.
 * @param taxRate The tax rate as a decimal (e.g., 0.21 for 21%).
 * @returns The final price including tax.
 *
 * @example
 * const finalPrice = calculateTotalPrice(100, 0.21); // Returns 121
 */
export const calculateTotalPrice = (price: number, taxRate: number): number => {
  return price * (1 + taxRate);
};
```
