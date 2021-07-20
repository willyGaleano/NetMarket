using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        //Condicion logica que se aplicara a la entidad
        Expression<Func<T,bool>> Criteria { get; }

        //Las relaciones que se aplicaran a la entidad
        List<Expression<Func<T, object>>> Includes { get; }
        
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }
        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }
    }
}
