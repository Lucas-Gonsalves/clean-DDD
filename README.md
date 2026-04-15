# clean-DDD

A TypeScript study project that models an online forum using Domain-Driven Design (DDD), Clean Architecture principles, and domain events.

This repository is centered on business rules, use cases, and automated tests. It does not currently include an HTTP API, UI, or database integration layer.

## Overview

The project is organized around two business domains:

- `forum`: questions, answers, comments, attachments, slugs, and best-answer selection
- `notification`: notifications triggered by relevant forum events

The codebase is designed to explore tactical DDD concepts such as:

- entities and aggregate roots
- value objects
- repository contracts
- domain events and subscribers
- use-case driven application services
- in-memory test doubles for fast unit tests

## Main Features

- Create, edit, and delete questions
- Create, edit, and delete answers
- Comment on questions and answers
- Delete question and answer comments
- Fetch recent topics with pagination
- Fetch question answers and comments
- Fetch answer comments
- Retrieve a question by slug
- Choose the best answer for a question with authorization checks
- Send notifications when important forum events happen
- Mark notifications as read

## Architecture

### `src/core`

Shared building blocks used across the application, including:

- `Entity` and `AggregateRoot`
- `UniqueEntityId`
- `WatchedList`
- `Either` for use-case responses
- domain errors
- domain event dispatcher

### `src/domain/forum`

Contains the forum domain split into:

- `enterprise`: domain entities, value objects, and domain events
- `application`: use cases and repository interfaces

### `src/domain/notification`

Contains notification-specific rules, repository contracts, use cases, and subscribers that react to forum domain events.

### `test`

Contains in-memory repositories, factories, and unit tests that validate the behavior of the use cases and event-driven flows.

## Project Structure

```text
src/
  core/
  domain/
    forum/
      application/
      enterprise/
    notification/
      application/
      enterprise/
test/
  factories/
  repositories/
  utils/
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run the test suite

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run lint

```bash
npm run lint
```

### Auto-fix lint issues

```bash
npm run lint:fix
```

## Notes

- The current focus of the repository is domain modeling and automated tests.
- Persistence is abstracted behind repository interfaces.
- Most examples in the project use in-memory repositories to keep tests isolated and fast.
- Domain events are used to decouple forum actions from notification behavior.

## Learning Goals

This project is a good reference if you want to study how to:

- structure a TypeScript codebase around business rules
- separate enterprise rules from application use cases
- model aggregates and value objects
- implement domain events and subscribers
- test use cases without depending on external infrastructure
