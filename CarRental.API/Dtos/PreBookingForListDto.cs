
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class PreBookingForListDto
    {
        public int Id { get; set; }
        public int? PickUpLocationId { get; set; }
        public string PickUpLocation { get; set; }
        public int? ReturnLocationId { get; set; }
        public string ReturnLocation { get; set; }
        public int? CarId { get; set; }
        public int DriverAge { get; set; }
        public decimal TotalPrice { get; set; }


        //Booking Info
        public DateTime PickUpDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
