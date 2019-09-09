using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Dtos
{
    public class SearchCarDto
    {
        public int? PickUpLocationId { get; set; }
        public int? ReturnLocationId { get; set; }
        public int? CarId { get; set; }
        public List<CarForListDto> Cars { get; set; }
        public string PicUpLocation { get; set; }
        public string ReturnLocation { get; set; }
        public int DriverAge { get; set; }
        public DateTime? PickUpDate { get; set; }
        public DateTime? ReturnDate { get; set; }

    }
}
