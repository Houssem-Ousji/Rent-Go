package tn.esprit.spring.booking;

import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookingServiceImpl implements BookingInterface {

        private final BookingRepository bookingRepository;

        public BookingServiceImpl(BookingRepository bookingRepository)
        {
            this.bookingRepository = bookingRepository;
        }

    @Override
    public Booking createBooking(Booking booking) {

        // Validation car_id obligatoire
        if (booking.getCarId() == null) {
            throw new IllegalArgumentException("Le champ car_id est obligatoire.");
        }

        // Validation dates correctes
        if (booking.getStartTime().isAfter(booking.getEndTime()) || booking.getStartTime().isEqual(booking.getEndTime())) {
            throw new IllegalArgumentException("La date de début doit être avant la date de fin.");
        }

        // Validation plage horaire autorisée
        LocalTime start = booking.getStartTime().toLocalTime();
        LocalTime end = booking.getEndTime().toLocalTime();
        if (start.isBefore(LocalTime.of(8, 0)) || end.isAfter(LocalTime.of(20, 0))) {
            throw new IllegalArgumentException("La réservation doit être entre 08:00 et 20:00.");
        }

        // Contrôle de chevauchement pour la même voiture
        boolean overlap = bookingRepository.existsByCarIdAndStartTimeLessThanAndEndTimeGreaterThan(
                booking.getCarId(), booking.getEndTime(), booking.getStartTime());

        if (overlap) {
            throw new IllegalArgumentException("Chevauchement détecté avec une autre réservation pour cette voiture.");
        }

        booking.setStatus(BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    @Override
        public List<Booking> getAllBookings() {
            return bookingRepository.findAll();
        }

        @Override
        public Booking getBookingById(Long id) {
            return bookingRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Réservation introuvable."));
        }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));

        if (booking.getStatus() == BookingStatus.CANCELED) {
            throw new IllegalStateException("La réservation est déjà annulée.");
        }

        if (booking.getStatus() == BookingStatus.CONFIRMED || booking.getStatus() == BookingStatus.COMPLETED) {
            throw new IllegalStateException("Impossible d'annuler une réservation confirmée ou complétée.");
        }

        booking.setStatus(BookingStatus.CANCELED);
        bookingRepository.save(booking);
    }


    @Override
    public void confirmBooking(Long id) {
        Booking booking = getBookingById(id);
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    @Override
    public void completeBooking(Long id) {
        Booking booking = getBookingById(id);

        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalStateException("La réservation ne peut être complétée que si elle est confirmée.");
        }

        booking.setStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookingsByCarId(Long carId) {
        return bookingRepository.findByCarId(carId);
    }

    @Override
    public void updateCarId(Long bookingId, Long newCarId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NoSuchElementException("Réservation introuvable."));

        // Vérifie s'il y a un chevauchement pour la même voiture mais avec une réservation différente
        boolean overlap = bookingRepository.existsByCarIdAndStartTimeLessThanAndEndTimeGreaterThanAndIdNot(
                newCarId, booking.getEndTime(), booking.getStartTime(), bookingId);

        if (overlap) {
            throw new IllegalArgumentException("Chevauchement détecté pour cette voiture avec une autre réservation.");
        }

        booking.setCarId(newCarId);
        bookingRepository.save(booking);
    }


}

