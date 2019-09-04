using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class CarForListDto
    {
        public int Id { get; set; }
        public string CarNumber { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string ModelYear { get; set; }
        public string FuelType { get; set; }
        public string TransmisionType { get; set; }
        public int? NumberOfDoors { get; set; }
        public int? CarCapacity { get; set; }
        public string CarColor { get; set; }
        public decimal? PriceForDay { get; set; }
        public string CarLocation { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
    }
}
