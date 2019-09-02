﻿using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface ITransmisionTypeService
    {

        Task<string> TransmisionTypeNameAsync(int transmisionTypeId);
        Task<IEnumerable<TransmisionType>> GetTransmisionTypesAsync();
        Task AddTransmisionTypeAsync(TransmisionType transmisionType);
        Task UpdateTransmisionTypeAsync(TransmisionType transmisionType);
        Task DeleteTransmisionTypeAsync(TransmisionType transmisionType);
        Task<TransmisionType> GetTransmisionTypeByIdAsync(int id);
    }
}
