using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public BookingController(IBookingService bookingService, IUserService userService, ILocationService locationService, ICarUploadService carUploadService)
        {
            _bookingService = bookingService;
            _userService = userService;
            _locationService = locationService;
            _carUploadService = carUploadService;
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

            var carUpload = await _carUploadService.GetCarUploadByCarIdAsync((int)booking.CarId);
            model.Car = new CarForListDto
            {
                Id = booking.Car.Id,
                CarNumber = booking.Car.CarNumber,
                BrandName = booking.Car.Brand.Name,
                ModelName = booking.Car.Model.Name,
                TransmisionType = booking.Car.TransmisionType.Name,
                FuelType = booking.Car.FuelType.Name,
                Path = Url.Content(carUpload.Path)
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

    }
}