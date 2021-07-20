using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class CategoriaController : BaseApiController
    {
        private readonly IGenericRepository<Categoria> _categoriaRepository;
        public CategoriaController(IGenericRepository<Categoria> categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Categoria>>> GetCategoriaAll()
        {
            var resultado = await _categoriaRepository.GetAllAsync();
            return Ok(resultado);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoriaById(int id)
        {
            return await _categoriaRepository.GetByIdAsync(id);
        }
    }
}
