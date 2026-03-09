import { openDB } from "./indexedDB";

const STORE_NAME = "activity";

/* -------- SAVE ACTIVITY FOR A YEAR -------- */

export async function saveActivity(year, data) {

  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readwrite");

  const store = tx.objectStore(STORE_NAME);

  store.put({
    id: year,
    data: data
  });

  return tx.complete;
}

/* -------- LOAD ACTIVITY FOR A YEAR -------- */

export async function loadActivity(year) {

  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readonly");

  const store = tx.objectStore(STORE_NAME);

  const request = store.get(year);

  return new Promise((resolve) => {

    request.onsuccess = () => {

      if (request.result) {
        resolve(request.result.data);
      } else {
        resolve(Array(365).fill(0));
      }

    };

    request.onerror = () => {
      resolve(Array(365).fill(0));
    };

  });
}