﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class CarForEditDto
    {
        public string CarNumber { get; set; }
        public int? BrandId { get; set; }
        public int? ModelId { get; set; }
        public string ModelYear { get; set; }
        public int? FuelTypeId { get; set; }
        public int? TransmisionTypeId { get; set; }
        public int? NumberOfDoors { get; set; }
        public int? CarCapacity { get; set; }
        public string CarColor { get; set; }
        public decimal? PriceForDay { get; set; }
        public int? CarLocationId { get; set; }
        public string Description { get; set; }

        public DateTime LastModifiedOnDate
        {
            get
            {
                return DateTime.Now;
            }
        }

        public bool IsDeleted
        {
            get
            {
                return false;
            }
        }



    }
}
