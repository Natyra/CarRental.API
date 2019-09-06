using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CarRental.API.Helpers;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private ICarService _carService;
        private ILocationService _locationService;
        private ICarUploadService _carUploadService;

        public HomeController(ICarService carService, ILocationService locationService, ICarUploadService carUploadService)
        {
            _carService = carService;
            _locationService = locationService;
            _carUploadService = carUploadService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("locations")]
        public async Task<IActionResult> GetLocations()
        {
            var model = new List<LocationDto>();
            var locationsAsync = await _locationService.GetLocationsAsync();
            var locations = locationsAsync.ToList();

            if (locations == null || locations.Count <= 0)
                return BadRequest("Any location not found");

            for (int i = 0; i < locations.Count(); i++)
            {
                model.Add(new LocationDto
                {
                    Id = locations[i].Id,
                    StreetAddress = locations[i].StreetAddress,
                    Country = locations[i].Country,
                    City = locations[i].City,
                    ZipCode = locations[i].ZipCode
                });
            }

            return Ok(model);
        }

        [HttpGet("carfleet")]
        public async Task<IActionResult> CarFleet([FromQuery]PaginationParams carsParam)
        {
            var model = new List<CarForListDto>();
            var carsAsync = await _carService.GetFilteredCarsAsync(carsParam);

            var cars = carsAsync.ToList();

            if (cars == null && cars.Count() <= 0)
                return BadRequest("No car found");

            for (int i = 0; i < cars.Count(); i++)
            {
                var carUpload = await _carUploadService.GetCarUploadByCarIdAsync(cars[i].Id);
                model.Add(new CarForListDto
                {
                    CarNumber = cars[i].CarNumber,
                    BrandName = cars[i].Brand.Name,
                    ModelName = cars[i].Model.Name,
                    CarCapacity = cars[i].CarCapacity,
                    CarLocation = await _locationService.GetLocationAsync(cars[i].Id),
                    FuelType = cars[i].FuelType.Name,
                    ModelYear = cars[i].ModelYear,
                    NumberOfDoors = cars[i].NumberOfDoors,
                    TransmisionType = cars[i].TransmisionType.Name,
                    PriceForDay = cars[i].PriceForDay,
                    Description = cars[i].Description,
                    Path = carUpload != null ? Url.Content(carUpload.Path) : ""
                });
            }
            Response.AddPagination(carsAsync.CurrentPage, carsAsync.PageSize, carsAsync.TotalCount, carsAsync.TotalPages);


            return Ok(model);

        }

        [HttpPost("filtercars")]
        public async Task<IActionResult> SearchCars(CarsFilterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok();
        }
    }
}