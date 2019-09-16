using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class DashboardDto
    {
        public int[] BookingPerCar { get; set; }
        public int[] BookingPerBrand { get; set; }      
        public string[] ModelName { get; set; }
        public string[] BrandName { get; set; }
    }
}
