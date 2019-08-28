using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class UserForRegisterDto
    {

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(22, MinimumLength = 6, ErrorMessage = "You must specify passord betwen 6 and 22 characters")]
        public string Password { get; set; }
    }
}
