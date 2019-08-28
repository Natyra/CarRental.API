using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IGenericRepository<T> where T:class
    {
        Task Add(T entity);
        void Update(T entity);
        Task AddRange(IEnumerable<T> entities);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicte, params Expression<Func<T, object>>[] includes);
        Task<T> FindOne(Expression<Func<T, bool>> predicte);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
        Task<bool> SaveChanges();
    }
}
