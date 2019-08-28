using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class Location
    {
        public Location()
        {
            Car = new HashSet<Car>();
            PreBookingPickLocation = new HashSet<PreBooking>();
            PreBookingReturnLocation = new HashSet<PreBooking>();
        }

        public int Id { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }

        public ICollection<Car> Car { get; set; }
        public ICollection<PreBooking> PreBookingPickLocation { get; set; }
        public ICollection<PreBooking> PreBookingReturnLocation { get; set; }
    }
}
