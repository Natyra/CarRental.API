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

        [HttpGet("filtercars")]
        public async Task<IActionResult> SearchCars([FromQuery]CarsFilterDto filter)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var model = new SearchCarDto();
            var cars = new List<CarForListDto>();

            if (filter.PickUpLocationId == 0 || filter.PickUpLocationId == null)
                return BadRequest();
            if (filter.PickUpDate == null)
                return BadRequest();
            if (filter.ReturnDate == null)
                return BadRequest();

            if (filter.ReturnLocationId == 0 || filter.ReturnLocationId == null)
            {
                filter.ReturnLocationId = filter.PickUpLocationId;
            }


            //filter.paginationParams = new PaginationParams();
            //filter.paginationParams.PageSize = 2;

            var dateTimePickUpArray = filter.PickUpDate.Split(" ");
            var dateTimeReturnArray = filter.ReturnDate.Split(" ");

            var dateTimePickUp = dateTimePickUpArray[1] + " " + dateTimePickUpArray[2] + " " + dateTimePickUpArray[3] + " " + dateTimePickUpArray[4];

            var dateTimeReturn = dateTimeReturnArray[1] + " " + dateTimeReturnArray[2] + " " + dateTimeReturnArray[3] + " " + dateTimeReturnArray[4];


            var dateTimePickUpFinal = Convert.ToDateTime(dateTimePickUp);
            var dateTimeReturnFinal = Convert.ToDateTime(dateTimeReturn);


            var filterO = new CarsFilterDtoOriginal();
            filterO.PickUpLocationId = filter.PickUpLocationId;
            filterO.ReturnDate = dateTimeReturnFinal;
            filterO.ReturnLocationId = filter.ReturnLocationId;
            filterO.PickUpDate = dateTimePickUpFinal;
            filterO.DriverAge = filter.DriverAge;
            filterO.paginationParams = new PaginationParams
            {
                PageSize = filter.PageSize,
                PageNumber = filter.PageNumber
            };

            var resultAsync = await _carService.GetCarsFromSearch(filterO);

            if (resultAsync == null)
                return BadRequest("No car founded");

            var result = resultAsync.ToList();

            for (int i = 0; i < result.Count(); i++)
            {
                var carUploadPath = await _carUploadService.GetPathOfCarUploadAsync(result[i].Id);
                cars.Add(new CarForListDto
                {
                    Id = result[i].Id,
                    CarNumber = result[i].CarNumber,
                    BrandName = result[i].Brand.Name,
                    ModelName = result[i].Model.Name,
                    CarCapacity = result[i].CarCapacity,
                    CarColor = result[i].CarColor,
                    CarLocation = await _locationService.GetLocationAsync((int)result[i].CarLocationId),
                    FuelType = result[i].FuelType.Name,
                    ModelYear = result[i].ModelYear,
                    NumberOfDoors = result[i].NumberOfDoors,
                    TransmisionType = result[i].TransmisionType.Name,
                    PriceForDay = Math.Round((decimal)result[i].PriceForDay,2),
                    Description = result[i].Description,
                    Path = Url.Content(carUploadPath)
                });
            }

            model.Cars = cars;
            model.PicUpLocation = await _locationService.GetLocationAsync((int)filter.PickUpLocationId);
            model.ReturnLocation = await _locationService.GetLocationAsync((int)filter.ReturnLocationId);
            model.PickUpDate = filterO.PickUpDate;
            model.ReturnDate = filterO.ReturnDate;
            model.PickUpLocationId = filter.PickUpLocationId;
            model.ReturnLocationId = filter.ReturnLocationId;

            

            Response.AddPagination(resultAsync.CurrentPage, resultAsync.PageSize, resultAsync.TotalCount, resultAsync.TotalPages);

            return Ok(model);
        }
    }
}