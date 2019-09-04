using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class ModelDto
    {
        public int Id { get; set; }
        public int? BrandId { get; set; }
        public string Name { get; set; }
    }
}
