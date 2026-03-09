const DB_NAME = "heatmapDB";
const STORE_NAME = "activity";
const DB_VERSION = 1;

export function openDB() {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Error opening DB");

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {

      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {

        db.createObjectStore(STORE_NAME, { keyPath: "id" });

      }

    };

  });

}