using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IUserService _userService;
        private readonly ILocationService _locationService;

        public BookingController(IBookingService bookingService, IUserService userService, ILocationService locationService)
        {
            _bookingService = bookingService;
            _userService = userService;
            _locationService = locationService;
        }
        [HttpPost]
        public async Task<bool> IsBookingOfUser ([FromBody]string email , int bookingId)
        {
            var userId = await _userService.GetUserIdByEmail(email);
            var booking = await _bookingService.GetBookingByIdAsync(bookingId);
            if (booking.UserId==userId)
            {
                return true;
            }
            return false;
        }

        [HttpGet("GetBookingDetails/{id}")]
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

            model.Car = new CarForListDto
            {
                Id = booking.Car.Id,
                CarNumber = booking.Car.CarNumber,
                BrandName = booking.Car.Brand.Name,
                ModelName = booking.Car.Model.Name
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