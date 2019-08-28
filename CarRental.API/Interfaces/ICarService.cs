using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetCarsAsync();
    }
}
