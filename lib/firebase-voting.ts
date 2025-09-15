import { db } from "@/lib/firestore"; // your firebase.ts file
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";

export async function getVotingStatus() {
  const docRef = doc(db, "settings", "voting");
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data().enabled : false;
}

export async function toggleVotingStatus(enabled: boolean) {
  const docRef = doc(db, "settings", "voting");
  await setDoc(docRef, { enabled }, { merge: true });
}

export async function getCandidates(category: "mr" | "mrs") {
  const qSnap = await getDocs(collection(db, "candidates"));
  return qSnap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter((c: any) => c.category === category);
}

export async function addVote(candidateId: string) {
  const docRef = doc(db, "candidates", candidateId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const currentVotes = snap.data().votes || 0;
    await updateDoc(docRef, { votes: currentVotes + 1 });
  }
}
