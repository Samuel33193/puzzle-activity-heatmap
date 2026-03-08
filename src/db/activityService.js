import { dbPromise } from "./indexedDB";

export async function saveActivity(data) {
  const db = await dbPromise;
  await db.put("activity", data);
}

export async function getActivity(date) {
  const db = await dbPromise;
  return db.get("activity", date);
}

export async function getAllActivity() {
  const db = await dbPromise;
  return db.getAll("activity");
}