// src/server.ts
import { app } from "./app";
import { initDatabase, dataSource } from "./config/data-source";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await initDatabase();
    console.log("📦 Database connected");

    await dataSource.runMigrations();
    console.log("🧩 Database migrations run successfully");

    app.listen(PORT, () => {
      console.log(`🚀 InnerDesk API running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error during server start:", err);
    process.exit(1);
  }
}

start();
