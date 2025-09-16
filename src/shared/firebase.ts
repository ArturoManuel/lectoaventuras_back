 import { initializeApp, applicationDefault, getApps, getApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

export function initFirebase(): App {
  if (getApps().length) {
    return getApp();
  }
  const app = initializeApp({
    credential: applicationDefault(),
  });

  return app;
}

export const firestore = () => getFirestore();
export const auth = () => getAuth();
export const realtimeDb = () => getDatabase();

