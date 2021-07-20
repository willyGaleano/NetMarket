using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class SeguridadDbContextData
    {
        public static async Task SeedUserAsync(UserManager<Usuario> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var usuario = new Usuario
                {
                    Nombre = "Williams",
                    Apellido = "Galeano",
                    UserName = "Willy23",
                    Email = "willyrhcp96@gmail.com",
                    Direccion = new Direccion
                    {
                        Calle = "SJL",
                        Ciudad = "Lima",
                        CodigoPostal = "2895",
                        Departamento = "Lima",
                    }
                };

                await userManager.CreateAsync(usuario, "Holamundo123*");
            }

            if (!roleManager.Roles.Any())
            {
                var role = new IdentityRole
                {
                    Name = "ADMIN"
                };
                await roleManager.CreateAsync(role);
            }

        }


    }
}
