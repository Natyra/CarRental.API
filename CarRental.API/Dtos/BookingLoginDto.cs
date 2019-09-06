using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class BookingLoginDto
    {
        public string Email { get; set; }
        public int BookingId { get; set; }
    }
}
