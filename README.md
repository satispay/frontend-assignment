# Satispay Frontend Recruitment Assignment

## Introduction

For this assignment what you will build is a simple page (and a server app) for querying and filtering a dataset of Pokémons hardcoded in the project.

The target of audience are other Satispay colleagues that can interact with internal dashboard/consoles.
The browser compatibility is assumed for the latest version of Google Chrome.

## Installation

#### 1. Clone Repository

#### 2. Install dependencies

`yarn install`

#### 3. Run local server in terminal

`yarn server`

#### 4. Run client in another terminal

`yarn client`

## Technologies Used

The server app is powered by Node.js, `typescript` and [`apollo-server`](https://www.apollographql.com/docs/apollo-server/).
The client app is be powered by `typescript`, `react`, [`apollo-client`](https://www.apollographql.com/docs/react/) and [`antd`](https://ant.design/).

The server schema follows the [relay](https://facebook.github.io/relay/graphql/connections.htm) standard for connection, simplified.

This project is powered by `yarn` and workspaces.

## Meeting the Requirements

### Server side

Implement `pokemonsByType` query: it accepts a `type: String` parameter and return a connection of Pokèmons.

## Components

- **FilterWrapper:** Wrapper to conditionally render FilterByName or FilterByType component
- **FilterByName:** Search Pokémon by name
- **FilterByType:** Filter Pokémon by type
- **PokeTable:** Table displaying pokemon data based on search by name OR filter by type

### Client side

Use components in `antd` library to create a page with this capabilities:

- possibility to search Pokémons by name
- possibility to filter Pokémons by type
- display Pokémons search result in a table with columns:
  - name
  - type
  - classification
- if `hasNextPage` is true add the possibility to load more results.

## **Evaluation**

Our goal is to find answers to those questions:

- Do you understand the TypeScript language and more in general web technologies?
- Can you design interfaces that are clear and easy to use?
- Do you master your working environment?
