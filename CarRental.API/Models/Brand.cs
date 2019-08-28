using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class Brand
    {
        public Brand()
        {
            Car = new HashSet<Car>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Car> Car { get; set; }
    }
}
