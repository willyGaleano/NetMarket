using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class SeguridadSpecificationEvaluator<T> where T : IdentityUser
    {
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> specification)
        {
            if (specification.Criteria != null)
            {
                inputQuery = inputQuery.Where(specification.Criteria);
            }

            if (specification.OrderBy != null)
            {
                inputQuery = inputQuery.OrderBy(specification.OrderBy);
            }

            if (specification.OrderByDescending != null)
            {
                inputQuery = inputQuery.OrderByDescending(specification.OrderByDescending);
            }

            if (specification.IsPagingEnabled)
            {
                inputQuery = inputQuery.Skip(specification.Skip).Take(specification.Take);
            }

            inputQuery = specification.Includes.Aggregate(inputQuery, (current, include) => current.Include(include));

            return inputQuery;
        }
    }
}
