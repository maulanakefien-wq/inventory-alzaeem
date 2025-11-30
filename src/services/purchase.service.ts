import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Purchase } from '@/types';

const COLLECTION_NAME = 'purchases';

export const addPurchase = async (purchase: Omit<Purchase, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...purchase,
      date: Timestamp.fromDate(new Date(purchase.date)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding purchase:', error);
    throw error;
  }
};

export const getAllPurchases = async (): Promise<Purchase[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Purchase[];
  } catch (error) {
    console.error('Error fetching purchases:', error);
    throw error;
  }
};

export const getPurchasesByDateRange = async (startDate: Date, endDate: Date): Promise<Purchase[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Purchase[];
  } catch (error) {
    console.error('Error fetching purchases by date range:', error);
    throw error;
  }
};

export const updatePurchase = async (purchaseId: string, purchase: Partial<Purchase>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, purchaseId);
    const updateData = { ...purchase, updatedAt: Timestamp.now() };
    if (purchase.date) updateData.date = Timestamp.fromDate(new Date(purchase.date));
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating purchase:', error);
    throw error;
  }
};

export const deletePurchase = async (purchaseId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, purchaseId));
  } catch (error) {
    console.error('Error deleting purchase:', error);
    throw error;
  }
};

export const calculateTotalPurchaseCost = async (): Promise<number> => {
  try {
    const purchases = await getAllPurchases();
    return purchases.reduce((total, purchase) => total + (purchase.buyTotal || 0), 0);
  } catch (error) {
    console.error('Error calculating purchase cost:', error);
    throw error;
  }
};
