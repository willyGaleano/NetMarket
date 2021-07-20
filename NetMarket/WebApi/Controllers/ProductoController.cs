using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Erros;

namespace WebApi.Controllers
{
    public class ProductoController : BaseApiController
    {
        private readonly IGenericRepository<Producto>  _productoRepository;
        private readonly IMapper _mapper;

        public ProductoController(IGenericRepository<Producto> productoRepository, IMapper mapper)
        {
            _productoRepository = productoRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductoDto>>> GetProductos([FromQuery]ProductoSpecificationParams productoParams)
        {
            var specification = new ProductoWithCategoriaAndMarcaSpecification(productoParams);
            var productos = await _productoRepository.GetAllWithSpec(specification);
            var specCount = new ProductoForCountingSpecification(productoParams);
            var totalProductos = await _productoRepository.CountAsync(specCount);
            var rounded = Math.Ceiling(Convert.ToDecimal(totalProductos) / Convert.ToDecimal(productoParams.PageSize));
            var totalPage = Convert.ToInt32(rounded);

            var data = _mapper.Map<IReadOnlyList<Producto>, IReadOnlyList<ProductoDto>>(productos);

            //Si la lista es readonly debde de ir envuelto por el OK()
            //return Ok(_mapper.Map<IReadOnlyList<Producto>, IReadOnlyList<ProductoDto>>(productos));

            return Ok(
                    new Pagination<ProductoDto>
                    {
                        Count = totalProductos,
                        Data = data,
                        PageCount = totalPage,
                        PageIndex = productoParams.PageIndex,
                        PageSize = productoParams.PageSize
                    }
                );
        }

        //http://localhost:5000/api/producto/1
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDto>> GetProducto(int id)
        {
            //specification = debe de incluir la logica de la condicion de la consulta y tambien las relaciones
            //entre las entidades, la relacion entre Producto, Marca y Categoria.

            var specification = new ProductoWithCategoriaAndMarcaSpecification(id);

            var producto = await _productoRepository.GetByIdWithSpec(specification);

            if (producto == null)
            {
                return NotFound(new CodeErrorResponse(404));
            }

            //producto origen, quiero que se transforme y la data que se va a transformar
            return _mapper.Map<Producto, ProductoDto>(producto);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        public async Task<ActionResult<Producto>> Post(Producto producto)
        {
            var resultado = await _productoRepository.Add(producto);
            if(resultado == 0)
            {
                throw new Exception("No se insertó el producto");
            }

            return Ok(producto);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Producto>> Put(int id, Producto producto)
        {
            producto.Id = id;
            var resultado = await _productoRepository.Update(producto);
            if (resultado == 0)
            {
                throw new Exception("No se actualizó el producto");
            }

            return Ok(producto);
        }

    }
}
