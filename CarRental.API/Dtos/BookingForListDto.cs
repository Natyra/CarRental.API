using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class BookingForListDto
    {
        public int Id { get; set; }
        public CarForListDto Car { get; set; }
        public PreBookingForListDto PreBooking { get; set; }
        public UserDto User { get; set; }
        public string PickUpLocation { get; set; }
        public string ReturnLocation { get; set; }
        public int DriverAge { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int CountBookings { get; set; }
        public bool CanBeDeleted
        {
            get
            {
                if (ReturnDate < DateTime.Now)
                    return true;
                else
                    return false;
            }
        }
    }
}
