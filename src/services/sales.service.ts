import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Sale } from '@/types';

const COLLECTION_NAME = 'sales';

/**
 * Add a new sale
 */
export const addSale = async (sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...sale,
      date: Timestamp.fromDate(new Date(sale.date)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding sale:', error);
    throw error;
  }
};

/**
 * Get all sales
 */
export const getAllSales = async (): Promise<Sale[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Sale[];
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

/**
 * Get sales by date range
 */
export const getSalesByDateRange = async (startDate: Date, endDate: Date): Promise<Sale[]> => {
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
    })) as Sale[];
  } catch (error) {
    console.error('Error fetching sales by date range:', error);
    throw error;
  }
};

/**
 * Get sales by product
 */
export const getSalesByProduct = async (productId: string): Promise<Sale[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('productId', '==', productId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Sale[];
  } catch (error) {
    console.error('Error fetching sales by product:', error);
    throw error;
  }
};

/**
 * Update a sale
 */
export const updateSale = async (saleId: string, sale: Partial<Sale>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, saleId);
    const updateData = {
      ...sale,
      updatedAt: Timestamp.now(),
    };
    if (sale.date) {
      updateData.date = Timestamp.fromDate(new Date(sale.date));
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating sale:', error);
    throw error;
  }
};

/**
 * Delete a sale
 */
export const deleteSale = async (saleId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, saleId));
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
};

/**
 * Calculate total sales revenue
 */
export const calculateTotalSalesRevenue = async (): Promise<number> => {
  try {
    const sales = await getAllSales();
    return sales.reduce((total, sale) => total + (sale.totalPrice || 0), 0);
  } catch (error) {
    console.error('Error calculating sales revenue:', error);
    throw error;
  }
};

/**
 * Calculate total profit
 */
export const calculateTotalProfit = async (): Promise<number> => {
  try {
    const sales = await getAllSales();
    return sales.reduce((total, sale) => total + (sale.profit || 0), 0);
  } catch (error) {
    console.error('Error calculating profit:', error);
    throw error;
  }
};
