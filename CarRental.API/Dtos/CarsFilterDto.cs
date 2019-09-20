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
        private const int MaxPageSize = 100;
        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;
        public int PageSize
        {
            get
            {
                return pageSize;
            }
            set
            {
                pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }
        }
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
