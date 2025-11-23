import { dataSource } from "../src/config/data-source";

beforeAll(async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    console.log("✅ Test database initialized");
  }
});

afterAll(async () => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
    console.log("✅ Test database connection closed");
  }
});

afterEach(async () => {
  // Limpa os dados entre testes
  if (dataSource.isInitialized) {
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.clear();
    }
  }
});
