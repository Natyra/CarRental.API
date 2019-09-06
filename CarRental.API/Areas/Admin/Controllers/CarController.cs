using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CarRental.API.Helpers;

namespace CarRental.API.Areas.Admin
{
    
    [Route("api/admin/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class CarController : Controller
    {
        private ICarService _carService;
        private UserManager<IdentityUser> _userManager;
        private IGenericRepository<Car> _genericRepository;
        private IBrandService _brandService;
        private IModelService _modelService;
        private IFuelTypeService _fuelTypeService;
        private ILocationService _locationService;
        private ICarUploadService _carUploadService;

        public CarController(ICarService carService, UserManager<IdentityUser> userManager, 
            IGenericRepository<Car> genericRepository, IBrandService brandService,
            IModelService modelService, IFuelTypeService fuelTypeService, ILocationService locationService, ICarUploadService carUploadService)
        {
            _carService = carService;
            _userManager = userManager;
            _genericRepository = genericRepository;
            _brandService = brandService;
            _modelService = modelService;
            _fuelTypeService = fuelTypeService;
            _locationService = locationService;
            _carUploadService = carUploadService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCars()
        {
            //if (!User.Identity.IsAuthenticated)
            //    return Unauthorized();
            //if (!User.IsInRole("Admin"))
            //    return Unauthorized();

            var model = new List<CarForListDto>();
            var carsAsync = await _carService.GetCarsAsync();
            var cars = carsAsync.ToList();

            if (cars == null || cars.Count() <= 0)
                return BadRequest();

            for (int i = 0; i < cars.Count(); i++)
            {
                var carUpload = await _carUploadService.GetCarUploadByCarIdAsync(cars[i].Id);
                model.Add(new CarForListDto
                {
                    Id = cars[i].Id,
                    CarNumber = cars[i].CarNumber,
                    BrandName = await _brandService.GetBrandNameAsync((int)cars[i].BrandId),
                    ModelYear = cars[i].ModelYear,
                    NumberOfDoors = cars[i].NumberOfDoors,
                    CarCapacity = cars[i].CarCapacity,
                    CarColor = cars[i].CarColor,
                    PriceForDay = cars[i].PriceForDay,
                    Description = cars[i].Description,
                    ModelName = await _modelService.GetModelNameAsync((int)cars[i].ModelId),
                    FuelType = await _fuelTypeService.GetFuelTypeNameAsync((int)cars[i].FuelTypeId),
                    TransmisionType = cars[i].TransmisionType.Name,
                    CarLocation = await _locationService.GetLocationAsync((int)cars[i].CarLocationId),
                    Path = carUpload != null ? Url.Content(carUpload.Path) : ""
                });
            }

           
            return Ok(model);
        }

        [HttpGet("cars")]
        public async Task<IActionResult> GetFilteredCars([FromQuery]PaginationParams carsParam)
        {
            //if (!User.Identity.IsAuthenticated)
            //    return Unauthorized();
            //if (!User.IsInRole("Admin"))
            //    return Unauthorized();

            var model = new List<CarForListDto>();
            var carsAsync = await _carService.GetFilteredCarsAsync(carsParam);
            var cars = carsAsync.ToList();

            if (cars == null || cars.Count() <= 0)
                return BadRequest();

            for (int i=0; i<cars.Count(); i++)
            {
                var carUpload = await _carUploadService.GetCarUploadByCarIdAsync(cars[i].Id);
                model.Add(new CarForListDto
                {
                    Id = cars[i].Id,
                    CarNumber = cars[i].CarNumber,
                    BrandName = await _brandService.GetBrandNameAsync((int)cars[i].BrandId),
                    ModelYear = cars[i].ModelYear,
                    NumberOfDoors = cars[i].NumberOfDoors,
                    CarCapacity = cars[i].CarCapacity,
                    CarColor = cars[i].CarColor,
                    PriceForDay = cars[i].PriceForDay,
                    Description = cars[i].Description,
                    ModelName = await _modelService.GetModelNameAsync((int)cars[i].ModelId),
                    FuelType = await _fuelTypeService.GetFuelTypeNameAsync((int)cars[i].FuelTypeId),
                    TransmisionType = cars[i].TransmisionType.Name,
                    CarLocation = await _locationService.GetLocationAsync((int)cars[i].CarLocationId),
                    Path = carUpload != null? Url.Content(carUpload.Path):""
                });
            }

            Response.AddPagination(carsAsync.CurrentPage, carsAsync.PageSize, carsAsync.TotalCount, carsAsync.TotalPages);

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarById(int id)
        {
            var model = new CarForAddDto();
            var car = await _carService.GetCarByIdAsync(id);

            if (car == null)
                return BadRequest("Car not found");

            model.Id = car.Id;
            model.CarNumber = car.CarNumber;
            model.BrandId = car.BrandId;
            model.ModelYear = car.ModelYear;
            model.ModelId = car.ModelId;
            model.FuelTypeId = car.FuelTypeId;
            model.TransmisionTypeId = car.TransmisionTypeId;
            model.NumberOfDoors = car.NumberOfDoors;
            model.CarCapacity = car.CarCapacity;
            model.CarColor = car.CarColor;
            model.PriceForDay = car.PriceForDay;
            model.CarLocationId = car.CarLocationId;
            model.Description = car.Description;

            return Ok(model);

        }

        [HttpPost("add")]
        [Authorize("Bearer")]

        public async Task<IActionResult> AddCar(CarForAddDto model)
        {
            //if (!User.Identity.IsAuthenticated)
            //    return Unauthorized();

            //if (!User.IsInRole("Admin"))
            //    return Unauthorized();

            if (!ModelState.IsValid)
            {
                return BadRequest("Something went wrong while adding the car");
            }

            var car = new Car
            {
                CarNumber = model.CarNumber,
                BrandId = model.BrandId,
                ModelId = model.ModelId,
                ModelYear = model.ModelYear,
                FuelTypeId = model.FuelTypeId,
                TransmisionTypeId = model.TransmisionTypeId,
                NumberOfDoors = model.NumberOfDoors,
                CarCapacity = model.CarCapacity,
                CarColor = model.CarColor,
                PriceForDay = model.PriceForDay,
                CarLocationId = model.CarLocationId,
                Description = model.Description,
                CreateByUserId = _userManager.GetUserId(User),
               
            };

            await _carService.AddCarAsync(car);

            if (model.Image != null && model.Image.Length > 0)
            {
               await _carService.UploadImage(model.Image, car.Id);
            }

            return Ok(new
            {
                message = "Car added successfully"
            });
        }

        [HttpPut("edit/{id}")]
        [Authorize("Bearer")]

        public async Task<IActionResult> EditCar(int id, CarForEditDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something went wrong while editing the car");
            }

            var carToEdit = await _carService.GetCarByIdAsync(id);

            if (carToEdit == null)
                return BadRequest("Car not founded");

            carToEdit.CarNumber = model.CarNumber;
            carToEdit.BrandId = model.BrandId;
            carToEdit.ModelId = model.ModelId;
            carToEdit.ModelYear = model.ModelYear;
            carToEdit.FuelTypeId = model.FuelTypeId;
            carToEdit.TransmisionTypeId = model.TransmisionTypeId;
            carToEdit.NumberOfDoors = model.NumberOfDoors;
            carToEdit.CarCapacity = model.CarCapacity;
            carToEdit.CarColor = model.CarColor;
            carToEdit.PriceForDay = model.PriceForDay;
            carToEdit.CarLocationId = model.CarLocationId;
            carToEdit.Description = model.Description;        
            carToEdit.LastModifiedByUserId = _userManager.GetUserId(User);
           

            await _carService.UpdateCarAsync(carToEdit);

            return Ok(new
            {
                message = "Car edited successfully"
            });
        }

        [HttpDelete("delete/{id}")]
        [Authorize("Bearer")]

        public async Task<IActionResult> DeleteCar(int id)
        {
            var carToDelete = await _carService.GetCarByIdAsync(id);

            if (carToDelete == null)
                return BadRequest("Car not found");

            carToDelete.IsDeleted = true;
            carToDelete.LastModifiedOnDate = DateTime.Now;
            carToDelete.LastModifiedByUserId = _userManager.GetUserId(User);

           await _carService.UpdateCarAsync(carToDelete);

            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Car Deleted Successfully!"
            });

        }

        [HttpPost("SearchResult")]
        public async Task<IActionResult> SearchResult([FromBody]CarsFilterDto carsFilterDto)
        {
            var location = new Location { Id = (int)carsFilterDto.PickUpLocationId };
            var model = new List<CarForListDto>();
            if (carsFilterDto.PickUpDate >= DateTime.UtcNow)
            {
                if (carsFilterDto.PickUpLocationId.HasValue)
                {
                    var carsInLocation = await _carService.CarsFilterLocationAsync(location);

                    foreach (var car in carsInLocation)
                    {
                        var carsBooking = await _carService.GetPreBookingsAsync(car.Id);
                        var bookingId = car.Booking.Select(x => x.Id).FirstOrDefault();
                        if (bookingId == carsBooking.Select(x => x.Id).FirstOrDefault())
                        {
                            var carUpload = await _carUploadService.GetCarUploadByCarIdAsync(car.Id);
                            model.Add(new CarForListDto
                            {
                                Id=car.Id,
                                CarNumber=car.CarNumber,
                                CarColor=car.CarColor,
                                CarCapacity=car.CarCapacity,
                                BrandName=car.Brand.Name,
                                ModelName=car.Model.Name,
                                NumberOfDoors=car.NumberOfDoors,
                                PriceForDay=car.PriceForDay,
                                FuelType=car.FuelType.Name,
                                ModelYear=car.ModelYear,
                                TransmisionType=car.TransmisionType.Name,
                                Path = carUpload != null ? Url.Content(carUpload.Path) : ""

                            });
                        }


                    }
                }
            }
            return Ok(model);

        }

    }
}