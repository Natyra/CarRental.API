using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("Bearer")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IUserService _userService;
        private readonly ILocationService _locationService;
        private readonly ICarUploadService _carUploadService;
        private readonly IBrandService _brandService;
        private readonly IFuelTypeService _fuelTypeService;
        private readonly ITransmisionTypeService _transmisionTypeService;
        private readonly IModelService _modelService;
        private readonly IPreBookingService _preBookingService;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IGenericRepository<Booking> _genericRepository;
        private readonly IEmailService _emailService;

        public BookingController(IBookingService bookingService, IUserService userService, ILocationService locationService, ICarUploadService carUploadService, IBrandService brandService, IFuelTypeService fuelTypeService, ITransmisionTypeService transmisionTypeService, IModelService modelService, IPreBookingService preBookingService, UserManager<IdentityUser> userManager, IGenericRepository<Booking> genericRepository, IEmailService emailService)
        {
            _bookingService = bookingService;
            _userService = userService;
            _locationService = locationService;
            _carUploadService = carUploadService;
            _brandService = brandService;
            _fuelTypeService = fuelTypeService;
            _transmisionTypeService = transmisionTypeService;
            _modelService = modelService;
            _preBookingService = preBookingService;
            _userManager = userManager;
            _genericRepository = genericRepository;
            _emailService = emailService;
        }
        [HttpPost("userbooking")]
        public async Task<IActionResult> IsBookingOfUser([FromBody]BookingLoginDto model)
        {
            var isValidUser = false;
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    message = "Email or bookingId is not fount"
                });

            var user = await _userService.GetUserIdByEmail(model.Email);
            if (user == null)
                return BadRequest("User not found");
           
            var booking = await _bookingService.GetBookingByIdAsync(model.BookingId);

            if (booking == null)
                return BadRequest("Booking not found");


            if (booking.UserId==user.Id)
            {
                isValidUser = true;
            }
            else
            {
                isValidUser = false;
            }

            return Ok(new
            {
                isValidUser = isValidUser
            });
        }

        [HttpGet("bookingdetails/{id}")]
        public async Task<IActionResult> GetBookingDetails(int id)
        {
            var model = new BookingForListDto();
            var bookingsAsync = await _bookingService.GetBookingAndDependenciesById(id);
            var booking = bookingsAsync;

            if (booking == null)
                return BadRequest("Booking not found");


            model.Id = booking.Id;
            model.PickUpLocation = await _locationService.GetLocationAsync((int)booking.PreBooking.PickLocationId);
            model.ReturnLocation = await _locationService.GetLocationAsync((int)booking.PreBooking.ReturnLocationId);
            model.PickUpDate = (DateTime)booking.PreBooking.PickDate;
            model.ReturnDate = (DateTime)booking.PreBooking.ReturnDate;

            var carUpload = await _carUploadService.GetPathOfCarUploadAsync((int)booking.Car.Id);
            model.Car = new CarForListDto
            {
                Id = booking.Car.Id,
                CarNumber = booking.Car.CarNumber,
                BrandName = await _brandService.GetBrandNameAsync((int)booking.Car.BrandId),
                ModelName = await _modelService.GetModelNameAsync((int)booking.Car.ModelId),
                TransmisionType = await _transmisionTypeService.TransmisionTypeNameAsync((int)booking.Car.TransmisionTypeId),
                FuelType = await _fuelTypeService.GetFuelTypeNameAsync((int)booking.Car.FuelTypeId),
                Path = Url.Content(carUpload)
            };

            model.User = new UserDto
            {
                Id = booking.User.Id,
                FirstName = booking.User.FirstName,
                LastName = booking.User.LastName,
                Email = booking.User.Email,
                PhoneNumber = booking.User.PhoneNumber
            };



            return Ok(model);

        }

        [HttpPost("addprebooking")]
        public async Task<IActionResult> AddPreBooking(PreBookingForAdd model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var dateTimePickUpArray = model.PickUpDate.Split(" ");
            var dateTimeReturnArray = model.ReturnDate.Split(" ");

            var dateTimePickUp = dateTimePickUpArray[1] + " " + dateTimePickUpArray[2] + " " + dateTimePickUpArray[3] + " " + dateTimePickUpArray[4];

            var dateTimeReturn = dateTimeReturnArray[1] + " " + dateTimeReturnArray[2] + " " + dateTimeReturnArray[3] + " " + dateTimeReturnArray[4];


            var dateTimePickUpFinal = Convert.ToDateTime(dateTimePickUp);
            var dateTimeReturnFinal = Convert.ToDateTime(dateTimeReturn);

            var preBooking = new PreBooking();
            preBooking.PickLocationId = model.PickUpLocationId;
            preBooking.ReturnLocationId = model.ReturnLocationId;
            preBooking.PickDate = dateTimePickUpFinal;
            preBooking.ReturnDate = dateTimeReturnFinal;
            preBooking.AgeOfUser = model.DriverAge;
            preBooking.CreateOnDate = DateTime.Now;
            preBooking.IsDeleted = false;

            await _preBookingService.AddPreBooking(preBooking);
            await _preBookingService.SaveChanges();

            return Ok(new {
                message = "PreBooking added successfully",
                pb = preBooking.Id,
                car = model.CarId
            });
        }


        [HttpGet("prebooking/{id}")]
        public async Task<IActionResult> GetPreBookingById(int id)
        {
            if(id == 0)
            {
                return BadRequest("PreBooking not found");
            }

        

            var preBooking = await _preBookingService.GetPreBookingByIdAsync(id);


            var model = new PreBookingForAdd
            {
                Id = preBooking.Id,
                DriverAge = (int)preBooking.AgeOfUser,
                PickUpDateReal = (DateTime)preBooking.PickDate,
                PickUpLocationId = preBooking.PickLocationId,
                ReturnDateReal = (DateTime)preBooking.ReturnDate,
                ReturnLocationId = preBooking.ReturnLocationId,
                
            };

            return Ok(model);
        }

        [HttpPost("addcustomer")]
        public async Task<IActionResult> AddCustomer(UserDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userExists = await _userService.GetUserIdByEmail(model.Email);

            if(userExists != null)
            {
                userExists.FirstName = model.FirstName;
                userExists.LastName = model.LastName;
                userExists.PhoneNumber = model.PhoneNumber;
                userExists.Email = model.Email;

                _userService.UpdateUser(userExists);
                await _userService.SaveChangesAsync();
                return Ok(new
                {
                    car = model.CarId,
                    pb = model.PreBookingId,
                    user = userExists.Id
                });
            }
            else
            {
                var identityUser = new IdentityUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(identityUser);

                if(result.Succeeded)
                {
                    var userToUpdate = await _userService.GetUserIdByEmail(model.Email);
                    userToUpdate.FirstName = model.FirstName;
                    userToUpdate.LastName = model.LastName;
                    userToUpdate.PhoneNumber = model.PhoneNumber;
                    _userService.UpdateUser(userToUpdate);
                    await _userService.SaveChangesAsync();

                    return Ok(new
                    {
                        car = model.CarId,
                        pb = model.PreBookingId,
                        user = userToUpdate.Id
                    });

                }

               
            }

            return BadRequest(new
            {
                car = model.CarId,
                pb = model.PreBookingId
            });
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmBooking(ConfirmBookingDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var booking = new Booking();
            booking.PreBookingId = model.PreBookingId;
            booking.CarId = model.CarId;
            booking.UserId = model.UserId;
            booking.IsDeleted = false;
            booking.CreateByUserId = model.UserId;
            booking.CreateOnDate = DateTime.Now;
            booking.LastModifiedOnDate = DateTime.Now;
            booking.LastModifiedByUserId = model.UserId;

             await _genericRepository.Add(booking);
            await _genericRepository.SaveChangesAsync();

            var user = await _userService.GetUserByIdAsync(booking.UserId);
            var http = (HttpContext.Request.IsHttps == true ? "https://" : "http://");
            string HostName = http + HttpContext.Request.Host;

            await _emailService.SendEmailAsync(user.Email, "Booking Information",
                 $" Hello " + user.FirstName + " " + user.LastName + ", thank you for your booking" + "<br/><br/>" + "Booking number:" + booking.Id + "<br/><br/>" + "Booking email:" + user.Email + "<br/><br/>" + "This is an automated email by the system. If you shouldn't be recieving this email, please ignore it." + " <br/><br/>Car Rental.", false);

            return Ok(new
            {
                status = 200,
                message = "Booking created successfully",
                id = booking.Id,
                user = booking.UserId
            });
        }

    }
}