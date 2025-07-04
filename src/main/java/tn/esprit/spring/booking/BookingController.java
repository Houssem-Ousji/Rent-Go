package tn.esprit.spring.booking;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingInterface bookingService;

    public BookingController(BookingInterface bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            Booking savedBooking = bookingService.createBooking(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        try {
            Booking booking = bookingService.getBookingById(id);
            return ResponseEntity.ok(booking);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        try {
            bookingService.cancelBooking(id);
            return ResponseEntity.ok("Réservation annulée avec succès.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Long id) {
        try {
            bookingService.confirmBooking(id);
            return ResponseEntity.ok("Réservation confirmée avec succès.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeBooking(@PathVariable Long id) {
        try {
            bookingService.completeBooking(id);
            return ResponseEntity.ok("Réservation complétée avec succès.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Récupérer toutes les réservations par carId
    @GetMapping("/car/{carId}")
    public ResponseEntity<List<Booking>> getAllBookingsByCarId(@PathVariable Long carId) {
        List<Booking> bookings = bookingService.getAllBookingsByCarId(carId);
        return ResponseEntity.ok(bookings);
    }

    // Modifier/affecter carId d'une réservation
    @PutMapping("/update-car")
    public ResponseEntity<String> updateCarId(
            @RequestParam Long bookingId,
            @RequestParam Long newCarId) {
        try {
            bookingService.updateCarId(bookingId, newCarId);
            return ResponseEntity.ok("Car ID mis à jour avec succès.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne du serveur");
        }
    }
}


