using Core.Entities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    //indicamos que es generica y ponemos una condicion el tipo de clase que pueden implentarla
    //
    public interface IGenericRepository<T> where T : ClaseBase
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
