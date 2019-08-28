using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class Booking
    {
        public int Id { get; set; }
        public int? CarId { get; set; }
        public string UserId { get; set; }
        public int? PreBookingId { get; set; }
        public DateTime CreateOnDate { get; set; }
        public string CreateByUserId { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public string LastModifiedByUserId { get; set; }
        public bool IsDeleted { get; set; }

        public Car Car { get; set; }
        public PreBooking PreBooking { get; set; }
        public AspNetUsers User { get; set; }
    }
}
