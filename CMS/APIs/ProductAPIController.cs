using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Product;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    [Authorize]
    public class ProductAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public ProductAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<ProductCreateResource, Product>();
                    // Edit
                    cfg.CreateMap<ProductEditResource, Product>();
                    cfg.CreateMap<Product, ProductEditResource>().ForMember(r => r.Images, opt => opt.MapFrom(c => c.ProductImages.Select(p => p.Link)));
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/ProductAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.Products, loadOptions);
        }

        // GET: api/ProductAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Product data = await _db.Products.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Product, ProductEditResource>(data));
        }

        // PUT: api/ProductAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, ProductEditResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != resource.Id)
            {
                return BadRequest();
            }

            if (resource is null)
            {
                return BadRequest();
            }

            Product data = await _db.Products.FindAsync(id);

            if (data == null)
            {
                return NotFound();
            }

            _mapper.Map(resource, data);
            data.ModifyUser = User.Identity.GetUserId();
            data.ModifyTime = DateTime.Now;

            _db.Entry(data).State = EntityState.Modified;

            // Delete Old Images
            IQueryable<ProductImage> oldImages = _db.ProductImages.Where(p => p.ProductId == data.Id);
            _db.ProductImages.RemoveRange(oldImages);

            // Add New Images
            List<ProductImage> images = new List<ProductImage>();
            foreach (string link in resource.Images)
            {
                images.Add(new ProductImage
                {
                    ProductId = data.Id,
                    Link = link
                });
            }
            _db.ProductImages.AddRange(images);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }

        // POST: api/ProductAPI
        public async Task<IHttpActionResult> PostAsync(ProductCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product data = _mapper.Map<ProductCreateResource, Product>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.Products.Add(data);

            try
            {
                await _db.SaveChangesAsync();

                // Add Media Links
                List<ProductImage> images = new List<ProductImage>();
                foreach (string link in resource.Images)
                {
                    images.Add(new ProductImage
                    {
                        ProductId = data.Id,
                        Link = link
                    });
                }
                _db.ProductImages.AddRange(images);
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data.Id);
        }

        // DELETE: api/ProductAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Product data = await _db.Products.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            // Delete Images
            _db.ProductImages.RemoveRange(_db.ProductImages.Where(p => p.ProductId == id));

            // Delete Product
            _db.Products.Remove(data);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }
    }
}