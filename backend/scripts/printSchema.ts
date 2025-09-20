// src/scripts/print-schema.ts
// one-off script for printing the GraphQL schema to a file

import fs from 'node:fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { schema } from '../src/schema';
// import '../src/resolvers'; // <-- loads all type definitions

const printableSchema = lexicographicSortSchema(schema);
fs.writeFileSync('schema.graphql', printSchema(schema), 'utf8');
console.log('Wrote schema.graphql');
