import {
  ActionCtx as GenericActionCtx,
  MutationCtx as GenericMutationCtx,
  QueryCtx as GenericQueryCtx,
} from convex/server;

export type QueryCtx = GenericQueryCtx<any>;
export type MutationCtx = GenericMutationCtx<any>;
export type ActionCtx = GenericActionCtx<any>;

export {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from convex/server;
