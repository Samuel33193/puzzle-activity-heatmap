import { openDB } from "./indexedDB";

const STORE_NAME = "activity";

export async function saveActivity(data) {

  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readwrite");

  const store = tx.objectStore(STORE_NAME);

  store.put({ id: 1, data });

}

export async function loadActivity() {

  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readonly");

  const store = tx.objectStore(STORE_NAME);

  const request = store.get(1);

  return new Promise((resolve) => {

    request.onsuccess = () => {

      resolve(request.result?.data || Array(365).fill(0));

    };

  });

}