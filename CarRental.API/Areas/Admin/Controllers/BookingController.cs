using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class BookingController : Controller
    {
        private IBookingService _bookingService;
        private IGenericRepository<Booking> _genericRepository;
        private ILocationService _locationService;

        public BookingController(IBookingService bookingService, IGenericRepository<Booking> genericRepository, ILocationService locationService)
        {
            _bookingService = bookingService;
            _genericRepository = genericRepository;
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var model = new List<BookingForListDto>();
            var bookingsAsync = await _bookingService.GetBookingsAsync();
            var bookings = bookingsAsync.ToList();

            if (bookings == null || bookings.Count <= 0)
                return BadRequest("Booking not found");

            for (int i = 0; i < bookings.Count(); i++)
            {
                model.Add(new BookingForListDto
                {
                    Id = bookings[i].Id,
                    PickUpLocation = await _locationService.GetLocationAsync((int)bookings[i].PreBooking.PickLocationId),
                    ReturnLocation = await _locationService.GetLocationAsync((int)bookings[i].PreBooking.ReturnLocationId),
                    PickUpDate = (DateTime)bookings[i].PreBooking.PickDate,
                    ReturnDate = (DateTime)bookings[i].PreBooking.ReturnDate,

                    Car = new CarForListDto
                    {
                        Id = bookings[i].Car.Id,
                        CarNumber = bookings[i].Car.CarNumber
                    },

                    User = new UserDto
                    {
                        Id = bookings[i].User.Id,
                        FirstName = bookings[i].User.FirstName,
                        LastName = bookings[i].User.LastName,
                        Email = bookings[i].User.Email,
                        PhoneNumber = bookings[i].User.PhoneNumber
                    }
                });
            }

            return Ok(model);
        }



        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);

            if (booking == null)
                return BadRequest("Booking not found");

            await _bookingService.DeleteBookingAsync(booking);

            return Ok(new
            {
                status = 200,
                message = "Booking deleted successfully!"
            });

        }
    }
}