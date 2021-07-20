using BusinessLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Logic
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly MarketDbContext _context;
        public ProductoRepository(MarketDbContext context)
        {
            _context = context;
        }

        public async Task<Producto> GetProductoByIdAsync(int Id)
        {
            return await _context.Producto
                            .Include(x => x.Marca)
                            .Include(x => x.Categoria)
                            .FirstOrDefaultAsync(p => p.Id == Id);
        }

        public async Task<IReadOnlyList<Producto>> GetProductosAsync()
        {
            return await _context.Producto
                            .Include(x => x.Marca)
                            .Include(x => x.Categoria)
                            .ToListAsync();
        }
    }
}
