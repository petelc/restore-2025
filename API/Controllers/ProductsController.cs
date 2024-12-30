using System.Reflection.PortableExecutable;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] // https://localhost:5001/api/products
    [ApiController]
    public class ProductsController(StoreContext context) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await context.Products.ToListAsync();
        }

        [HttpGet("{id}")] // https://localhost:5001/api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();
            
            return product;
        }

        [HttpPost]
                public string AddProduct()
        {
            return "Product added";
        }

        [HttpPut("{id}")]
        public string UpdateProduct(int id)
        {
            return "Product updated";
        }

        [HttpDelete("{id}")]
        public string DeleteProduct(int id)
        {
            return "Product deleted";
        }
    }
}
