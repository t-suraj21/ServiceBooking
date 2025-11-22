import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  price: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  icon: string;
  packageName?: string;
  services?: string[];
  createdAt: Date;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  cancelBooking: (id: string) => void;
  getUpcomingBookings: () => Booking[];
  getPastBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'cancelled');
  };

  const getUpcomingBookings = () => {
    return bookings
      .filter((booking) => booking.status === 'confirmed')
      .sort((a, b) => {
        // Sort by date priority: Today > Tomorrow > Day After
        const dateOrder: { [key: string]: number } = { 'Today': 1, 'Tomorrow': 2, 'Day After': 3 };
        const aOrder = dateOrder[a.date] || 999;
        const bOrder = dateOrder[b.date] || 999;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
  };

  const getPastBookings = () => {
    return bookings
      .filter((booking) => booking.status === 'completed' || booking.status === 'cancelled')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBookingStatus,
        cancelBooking,
        getUpcomingBookings,
        getPastBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}

