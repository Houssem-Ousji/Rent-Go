package tn.esprit.spring.booking;

import java.util.List;

public interface BookingInterface {
    Booking createBooking(Booking booking);
    List<Booking> getAllBookings();
    Booking getBookingById(Long id);
    void cancelBooking(Long id);
    void confirmBooking(Long id);

    void completeBooking(Long id);
    List<Booking> getAllBookingsByCarId(Long carId);

    void updateCarId(Long bookingId, Long newCarId);




}
