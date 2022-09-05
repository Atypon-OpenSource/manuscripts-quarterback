# @manuscripts/quarterback-api

## 0.1.12

### Patch Changes

- 01739c7: fix(api): increase allowed json payload to 10mb

## 0.1.11

### Patch Changes

- 4baa400: fix(api): change Docker image to slim since prisma breaks with arm64 macbook m1

## 0.1.10

### Patch Changes

- e0c2677: fix(api): dont copy generated types in Dockerfile incase it doesnt exist locally

## 0.1.9

### Patch Changes

- 3b16fbc: refactor: rename comment change_id to target_id, reset db
- 70107ce: fix(api): use x-authorization header while istio is not configured
- Updated dependencies [3b16fbc]
- Updated dependencies [081f7fd]
  - @manuscripts/quarterback-db@0.1.2
  - @manuscripts/quarterback-types@0.2.2

## 0.1.8

### Patch Changes

- d55715e: fix(api): disable CORS by default, dont rely on set env

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
