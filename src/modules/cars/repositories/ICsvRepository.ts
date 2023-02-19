interface ICsvRepository {
  create(): Promise<string>;
}

export { ICsvRepository };
