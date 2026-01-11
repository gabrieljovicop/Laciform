import { useEffect, useState } from "react";
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export function useUserFormStats() {
  const { currentUser } = useAuth();
  const [formCount, setFormCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchCount = async () => {
      try {
        const q = query(
          collection(db, "forms"),
          where("authorId", "==", currentUser.uid)
        );

        const snapshot = await getCountFromServer(q);
        setFormCount(snapshot.data().count);
      } catch (err) {
        console.error("Gagal ambil jumlah form:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [currentUser]);

  return { formCount, loading };
}