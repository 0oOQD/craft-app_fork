import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Friend } from '../types/Friend';

const friendshipsCollection = collection(db, 'friendships');

const mapFriend = (id: string, data: DocumentData): Friend => ({
  id,
  fromUserId: String(data.fromUserId),
  fromEmail: String(data.fromEmail),
  toEmail: String(data.toEmail),
});

export const subscribeToFriendsAdded = (
  userId: string,
  callback: (friends: Friend[]) => void,
  onError: (message: string) => void,
): (() => void) => {
  const q = query(friendshipsCollection, where('fromUserId', '==', userId));
  return onSnapshot(
    q,
    (snapshot) => callback(snapshot.docs.map((d) => mapFriend(d.id, d.data()))),
    (err) => onError(err.message),
  );
};

export const subscribeToFriendsWhoAddedMe = (
  email: string,
  callback: (friends: Friend[]) => void,
  onError: (message: string) => void,
): (() => void) => {
  const q = query(friendshipsCollection, where('toEmail', '==', email));
  return onSnapshot(
    q,
    (snapshot) => callback(snapshot.docs.map((d) => mapFriend(d.id, d.data()))),
    (err) => onError(err.message),
  );
};

export const addFriend = async (fromUserId: string, fromEmail: string, toEmail: string): Promise<void> => {
  await addDoc(friendshipsCollection, {
    fromUserId,
    fromEmail,
    toEmail,
    createdAt: serverTimestamp(),
  });
};

export const removeFriend = async (friendshipId: string): Promise<void> => {
  await deleteDoc(doc(db, 'friendships', friendshipId));
};
