using CarRental.API.Dtos;
using CarRental.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;

        }


        [HttpGet]
        public async Task<IActionResult> GetDashboardDataAsync()
        {

            var cars = await _dashboardService.GetCarsInBookingAsync();
            var carList = cars.ToList();
            var carsNr = cars.Count();
            int[] carsId = new int[carList.Count()];
            int[] bookingsPerCar = new int[carsNr];

            string[] carName = new string[carsNr];

            for (int i = 0; i < carsNr; i++)
            {
                if (carList[i].Booking != null)
                {
                    carsId[i] = carList[i].Id;
                    bookingsPerCar[i] = await _dashboardService.BookingPerCarAsync(carsId[i]);
                    carName[i] = await _dashboardService.CarNameAsync(carsId[i]);
                }

            }

            var brands = await _dashboardService.GetBrandsInBookingAsync();
            var brandList = brands.ToList();
            int[] brandsId = new int[brandList.Count()];
            int[] bookingsPerBrand = new int[brandsId.Length];

            string[] brandName = new string[brandList.Count()];


            for (int i = 0; i < brandList.Count(); i++)
            {
                brandsId[i] = brandList[i].Id;
                bookingsPerBrand[i] = await _dashboardService.BookingPerBrandAsync(brandsId[i]);
                brandName[i] = await _dashboardService.BrandNameAsync(brandsId[i]);
                
            }


            var model = new List<DashboardDto>();

            if (bookingsPerCar.Count() == 0)
                return BadRequest("Bookings/car not found");

            model.Add(new DashboardDto
            {
                BookingPerCar = bookingsPerCar,
                BookingPerBrand = bookingsPerBrand,
                ModelName= carName,
                BrandName=brandName
            });


            return Ok(model);
        }
    }
}