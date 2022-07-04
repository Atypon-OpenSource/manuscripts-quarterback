# @manuscripts/quarterback-api

## 0.1.7

### Patch Changes

- 0856ccb: fix(api): CORS origin value

## 0.1.6

### Patch Changes

- e58bdee: fix(api): disable CORS since it breaks & requests are already blocked unless from deployed site

## 0.1.5

### Patch Changes

- b0cbbcb: fix(api): parse CORS_SAME_ORIGIN properly

## 0.1.4

### Patch Changes

- 6084422: fix(api): version for /stats route, disable resetting db in production

## 0.1.3

### Patch Changes

- b0974f0: feat(api): add /stats route to show version & uptime

## 0.1.2

### Patch Changes

- d8e23e8: fix: temporarily reset prod DB on Quarterback API launch
- f625736: remove ok from Maybe type
- Updated dependencies [d8e23e8]
- Updated dependencies [f625736]
  - @manuscripts/quarterback-db@0.1.1
  - @manuscripts/quarterback-types@0.2.1

## 0.1.1

### Patch Changes

- a1bf083: Rename Event to Maybe to make it less ambiguous
- 1607120: API: fix user.\_id to .id
- Updated dependencies [a1bf083]
  - @manuscripts/quarterback-types@0.2.0

## 0.1.0

### Minor Changes

- 81c018f: feat: save current doc as well to Quarterback

### Patch Changes

- Updated dependencies [81c018f]
  - @manuscripts/quarterback-db@0.1.0
  - @manuscripts/quarterback-types@0.1.0

## 0.0.2

### Patch Changes

- 5269319ba: Update READMEs, add documentation on releasing with changesets
- Updated dependencies [5269319ba]
  - @manuscripts/quarterback-db@0.0.2
  - @manuscripts/quarterback-types@0.0.2
