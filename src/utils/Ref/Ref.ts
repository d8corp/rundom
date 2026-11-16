/** Mutable reference container used by the `ref` props of components. */
export class Ref <E> {
  constructor (public value?: E) {}
}
