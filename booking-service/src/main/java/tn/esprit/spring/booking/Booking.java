package tn.esprit.spring.booking;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;



@Entity
@Table(name = "T_RESERVATION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Booking implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientName;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private Long carId;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;


}

