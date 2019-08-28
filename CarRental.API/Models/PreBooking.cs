using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class PreBooking
    {
        public PreBooking()
        {
            Booking = new HashSet<Booking>();
        }

        public int Id { get; set; }
        public int? PickLocationId { get; set; }
        public int? ReturnLocationId { get; set; }
        public DateTime? PickDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int? AgeOfUser { get; set; }
        public DateTime CreateOnDate { get; set; }
        public string CreateByUserId { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public string LastModifiedByUserId { get; set; }
        public bool IsDeleted { get; set; }

        public Location PickLocation { get; set; }
        public Location ReturnLocation { get; set; }
        public ICollection<Booking> Booking { get; set; }
    }
}
