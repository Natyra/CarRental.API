using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class ConfirmBookingDto
    {
        public int PreBookingId { get; set; }
        public int CarId { get; set; }
        public string UserId { get; set; }
    }
}
