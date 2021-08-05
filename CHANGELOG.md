# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2021-08-05

### Changed
- Upgraded major dependencies to latest releases & fixed related type issues.
- Migrated from hookstate to zustand for global state management.

## [1.0.0-rc.9] - 2021-02-08

### Fixed

- Properly extract the `updatedAt` field from Contentful.

### Added

- Code blocks now have a copy to clipboard button.

### Changed

- Moved `<CodeBlock />` to its own component.
- Reworked the way `<Code />` and `<CodeBlock />` components inherit styles when they're contained within another colorSchemed component, such as `Admonition />`.

## [1.0.0-rc.8] - 2021-02-02

### Fixed

- Pre-render the `/cloud/daas` page.

## [1.0.0-rc.7] - 2021-02-02

### Changed

- Enable fallback on Cloud & Partner pages.
- Make `<TrialForm />` a standalone component, decoupled from the Partner layout.

### Added

- Forms can now be defined as a reference in Contentful on the 'Page Content' model. If defined, a Trial Form will be rendered below the body.

## [1.0.0-rc.6] - 2021-01-09

### Changed

- Remove implicit SEO noindex/nofollow tags.
- Properly add noindex/nofollow tags when in development.
