using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class Car
    {
        public Car()
        {
            Booking = new HashSet<Booking>();
            CarUpload = new HashSet<CarUpload>();
        }

        public int Id { get; set; }
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
        public DateTime CreateOnDate { get; set; }
        public string CreateByUserId { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public string LastModifiedByUserId { get; set; }
        public bool IsDeleted { get; set; }

        public Brand Brand { get; set; }
        public Location CarLocation { get; set; }
        public FuelType FuelType { get; set; }
        public Model Model { get; set; }
        public TransmisionType TransmisionType { get; set; }
        public ICollection<Booking> Booking { get; set; }
        public ICollection<CarUpload> CarUpload { get; set; }
    }
}
