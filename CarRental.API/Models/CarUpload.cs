using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class CarUpload
    {
        public int Id { get; set; }
        public int? CarId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        public Car Car { get; set; }
    }
}
