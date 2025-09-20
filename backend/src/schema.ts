import { builder } from './schemabuilder';
import './resolvers/types';
import './resolvers/inputs';
import './resolvers/queries';
import './resolvers/mutations';

export const schema = builder.toSchema();
