using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericSeguridadRepository<T> where T : IdentityUser
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T> GetByIdWithSpec(ISpecification<T> specification);
        Task<IReadOnlyList<T>> GetAllWithSpec(ISpecification<T> specification);
        Task<int> CountAsync(ISpecification<T> specification);

        Task<int> Add(T entity);
        Task<int> Update(T entity);
    }
}
