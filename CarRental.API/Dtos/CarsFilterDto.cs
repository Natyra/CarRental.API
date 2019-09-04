using CarRental.API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class CarsFilterDto
    {
        public int? PickUpLocationId { get; set; } = 0;
        public int? ReturnLocationId { get; set; } = 0;
        public DateTime? PickUpDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int DriverAge { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;

        public SelectList LocationList { get; set; }
    }
}
