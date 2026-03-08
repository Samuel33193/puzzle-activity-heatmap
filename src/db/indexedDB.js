import { openDB } from "idb";

export const dbPromise = openDB("heatmap-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("activity")) {
      db.createObjectStore("activity", { keyPath: "date" });
    }
  }
});