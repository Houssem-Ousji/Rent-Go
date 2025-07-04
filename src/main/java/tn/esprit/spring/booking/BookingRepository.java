package tn.esprit.spring.booking;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

        //boolean existsByStartTimeLessThanAndEndTimeGreaterThan(LocalDateTime end, LocalDateTime start);
        List<Booking> findByCarId(Long carId);
        boolean existsByCarIdAndStartTimeLessThanAndEndTimeGreaterThan(Long carId, LocalDateTime endTime, LocalDateTime startTime);
        boolean existsByCarIdAndStartTimeLessThanAndEndTimeGreaterThanAndIdNot(
                Long carId, LocalDateTime endTime, LocalDateTime startTime, Long excludeBookingId);



}
