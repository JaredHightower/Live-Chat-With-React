import { useState, useEffect } from 'react'
import { db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export default function useDoc(path) {
    const [docs, setDocs] = useState(null);

    useEffect(
        () => (
            onSnapshot(doc(db, path), (doc => {
                setDocs({
                    ...doc.data(),
                    id: doc.id
                })
            }))

        ), [docs, path])
    return docs
}