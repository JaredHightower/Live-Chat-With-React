import { useState, useEffect } from 'react'
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

const cache = {};
const pendingCache = {};

export default function useDocWithCache(path) {
    const [docs, setDocs] = useState(cache[path]);

    useEffect(() => {
        if (docs) return;
        let stillMounted = true;
        const getFirebaseDocs = async () => {
            const docSnap = await getDoc(doc(db, path));
            const pending = pendingCache[path];
            const promise = pending || (pendingCache[path] = docSnap);
            if (stillMounted) {
                const user = {
                    ...promise.data(),
                    id: promise.id
                }
                setDocs(user)
                cache[path] = user
            }
            return () => {
                stillMounted = false;
            }

        }
        return getFirebaseDocs();
    }, [docs, path])

    return docs
}