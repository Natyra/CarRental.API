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
        public string PickUpDate { get; set; }
        public string ReturnDate { get; set; }
        public int DriverAge { get; set; }
        public PaginationParams paginationParams { get; set; }
    }


    public class CarsFilterDtoOriginal
    {
        public int? PickUpLocationId { get; set; } = 0;
        public int? ReturnLocationId { get; set; } = 0;
        public DateTime? PickUpDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int DriverAge { get; set; }
        public PaginationParams paginationParams { get; set; }
    }
}
