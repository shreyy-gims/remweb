// lib/firestore.ts
import { db } from "@/firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";

// Cast a vote (only once per category per user)
export async function castVote(userId: string, category: string, nomineeId: string) {
  const voteRef = doc(db, "votes", `${userId}_${category}`);
  const voteSnap = await getDoc(voteRef);

  if (voteSnap.exists()) {
    throw new Error("You already voted in this category.");
  }

  await setDoc(voteRef, {
    userId,
    category,
    nomineeId,
    timestamp: new Date(),
  });

  // Increment nominee vote count
  const nomineeRef = doc(db, "nominees", nomineeId);
  await updateDoc(nomineeRef, { votes: increment(1) });
}

// Get voting status (on/off)
export async function getVotingStatus(): Promise<boolean> {
  const ref = doc(db, "settings", "voting");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().votingOpen : false;
}

// Admin: toggle voting status
export async function setVotingStatus(isOpen: boolean) {
  const ref = doc(db, "settings", "voting");
  await setDoc(ref, { votingOpen: isOpen });
}

// Admin: fetch all results
export async function getResults() {
  const nomineesRef = collection(db, "nominees");
  const q = await getDocs(nomineesRef);
  return q.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
