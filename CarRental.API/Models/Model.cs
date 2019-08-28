using System;
using System.Collections.Generic;

namespace CarRental.API.Models
{
    public partial class Model
    {
        public Model()
        {
            Car = new HashSet<Car>();
        }

        public int Id { get; set; }
        public int? BrandId { get; set; }
        public string Name { get; set; }

        public ICollection<Car> Car { get; set; }
    }
}
