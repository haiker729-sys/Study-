/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc,
  serverTimestamp,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../services/firebase';
import { StudyTask, UserProfile, StudyStatus, Priority } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyTask[];
      setTasks(taskList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tasks');
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const addTask = async (task: Omit<StudyTask, 'id' | 'userId'>) => {
    if (!auth.currentUser) return;
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'tasks');
    }
  };

  const updateTask = async (taskId: string, updates: Partial<StudyTask>) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `tasks/${taskId}`);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `tasks/${taskId}`);
    }
  };

  return { tasks, loading, addTask, updateTask, deleteTask };
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', auth.currentUser.uid);
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        // Create profile if it doesn't exist
        const newProfile: UserProfile = {
          uid: auth.currentUser!.uid,
          displayName: auth.currentUser!.displayName || 'Student',
          email: auth.currentUser!.email || '',
          photoURL: auth.currentUser!.photoURL || '',
          streak: 0,
          lastActive: new Date().toISOString().split('T')[0],
          points: 0,
          badges: []
        };
        try {
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `users/${auth.currentUser!.uid}`);
        }
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${auth.currentUser!.uid}`);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const updatePoints = async (amount: number) => {
    if (!profile || !auth.currentUser) return;
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        points: profile.points + amount
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
    }
  };

  return { profile, loading, updatePoints };
}
