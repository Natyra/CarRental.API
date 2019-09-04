using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface ILocationService
    {
        Task<string> GetLocationAsync(int locationId);
        Task<IEnumerable<Location>> GetLocationsAsync();
        Task AddLocationAsync(Location location);
        Task UpdateLocationAsync(Location location);
        Task DeleteLocationAsync(Location location);
        Task<Location> GetLocationByIdAsync(int id);
    }
}
