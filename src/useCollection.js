import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function useCollection(path, orderItemsBy) {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        if (orderItemsBy) {
            const collectionRef = collection(db, path)
            const q = query(collectionRef, orderBy(orderItemsBy))
            onSnapshot(q, (snapShot) => {
                setDocs(
                    snapShot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                )
            });
        } else {
            onSnapshot(collection(db, path), (snapshot) => {
                setDocs(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            });
        }
    }, [path, orderItemsBy]);
    return docs
}
