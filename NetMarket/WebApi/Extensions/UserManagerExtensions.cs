using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Extensions
{
    public static class UserManagerExtensions
    {
        //para extender funcionaliades
        public static Task<Usuario> BuscarUsuarioConDireccionAsync(this UserManager<Usuario> input, ClaimsPrincipal ususario)
        {
            var email = ususario?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = input.Users.Include(x => x.Direccion).SingleOrDefaultAsync(X => X.Email == email);
            return user;
        }


        public static Task<Usuario> BuscarUsuarioAsync(this UserManager<Usuario> input, ClaimsPrincipal ususario)
        {
            var email = ususario?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = input.Users.SingleOrDefaultAsync(X => X.Email == email);
            return user;
        }
    }
}
