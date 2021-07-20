using AutoMapper;
using BusinessLogic.Data;
using BusinessLogic.Logic;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Middleware;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();

            var builder = services.AddIdentityCore<Usuario>();
            builder = new IdentityBuilder(builder.UserType, builder.Services);

            builder.AddRoles<IdentityRole>();
            builder.AddEntityFrameworkStores<SeguridadDbContext>();
            builder.AddSignInManager<SignInManager<Usuario>>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                    options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            //que siempre sea validado el token que llega a mi backend
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:Key"])),
                            //a quien esta generando el token, lo esta generando mi aplicacion
                            //deberia de ser la url base de mi aplicacion
                            ValidIssuer = Configuration["Token:Issuer"],
                            ValidateIssuer = true,
                            //No filtrara los clientes, no validara la audiencia
                            //que cualquier cliente pueda consumir mis endpoints
                            ValidateAudience = false
                        };
                    }

                );

            

            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped(typeof(IGenericSeguridadRepository<>), typeof(GenericSeguridadRepository<>));

            services.AddDbContext<MarketDbContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddDbContext<SeguridadDbContext>(x =>
            {
                x.UseSqlServer(Configuration.GetConnectionString("IdentitySeguridad"));
            });

            //Una sola instancia de objeto conexcion para el redis que sera usado durante toda 
            //la vida del ciclo del porgrama
            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                //true para que ignore los origenes desconocidos
                var configuration = ConfigurationOptions.Parse(Configuration.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.TryAddSingleton<ISystemClock, SystemClock>();

            //Para tiempos de vida cortos
            services.AddTransient<IProductoRepository, ProductoRepository>();
            services.AddControllers();

            services.AddScoped<ICarritoCompraRepository, CarritoCompraRepository>();

            services.AddCors(opt =>
           {
               opt.AddPolicy("CorsRule", rule =>
               {
                   rule.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");
               });
           });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePagesWithReExecute("/errors","?code={0}");

            app.UseRouting();
            app.UseCors("CorsRule");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
