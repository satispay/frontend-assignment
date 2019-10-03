import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { Connection, Edge, PageInfo } from "./types";

export function toConnection<A extends { id: string }>(
  as: A[],
  size: number
): Connection<A> {
  const sliced = as.slice(0, size);
  const edges: Array<Edge<A>> = sliced.map(a => ({ cursor: a.id, node: a }));
  const endCursor = pipe(
    A.last(edges),
    O.map(a => a.cursor),
    O.toUndefined
  );
  const hasNextPage = size < as.length;
  const pageInfo: PageInfo = {
    endCursor,
    hasNextPage
  };
  return { edges, pageInfo };
}

/**
 * Data-last version of Array.prototype.slice
 */
export function slice<A>(start?: number, end?: number): (a: A[]) => A[] {
  return as => as.slice(start, end);
}
