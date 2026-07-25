import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

export type ProgressKind = 'lesson' | 'exercise' | 'quiz'

export interface ProgressRecord {
  slug: string
  kind: ProgressKind
  completedAt: string
  /** Kind-specific payload, e.g. a QuizAttempt's score/answers. */
  data?: Record<string, unknown>
}

interface ProgressDBSchema extends DBSchema {
  progress: {
    key: string
    value: ProgressRecord
  }
}

const DB_NAME = 'ilovejava:progress'
const DB_VERSION = 1
const STORE_NAME = 'progress'

let dbPromise: Promise<IDBPDatabase<ProgressDBSchema>> | null = null

/** `indexedDB` is unavailable in some browsers/embedded contexts - callers must check before using this. */
export function isIndexedDBAvailable(): boolean {
  return typeof indexedDB !== 'undefined'
}

function getDB() {
  dbPromise ??= openDB<ProgressDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'slug' })
    },
  })
  return dbPromise
}

export async function putProgressRecord(record: ProgressRecord): Promise<void> {
  const db = await getDB()
  await db.put(STORE_NAME, record)
}

export async function getAllProgressRecords(): Promise<ProgressRecord[]> {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}
