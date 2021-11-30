import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from './firebase';

export default function useCollection(path, orderItemsBy, whereData = []) {
    const [docs, setDocs] = useState([]);
    const [queryField, queryOperator, queryValue] = whereData;

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
        } else if (queryField) {
            const getWhereQuery = async () => {
                try {
                    const collectionRef = collection(db, path)
                    const q = query(collectionRef, where(queryField, queryOperator, queryValue))
                    const queryResults = await getDocs(q);
                    queryResults.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                    });
                } catch (err) {
                    console.log(err)
                }
            }
            getWhereQuery()
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
    }, [path, orderItemsBy, queryField, queryOperator, queryValue]);
    return docs
}