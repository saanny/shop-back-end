export default interface ITransformer<T> {
  transform: (item: T) => void;
  collection: (items: T[]) => void;
}
