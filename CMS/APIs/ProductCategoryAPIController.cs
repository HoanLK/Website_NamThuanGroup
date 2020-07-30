using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.ProductCategory;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    [Authorize]
    public class ProductCategoryAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public ProductCategoryAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<ProductCategoryCreateResource, ProductCategory>();
                    // Edit
                    cfg.CreateMap<ProductCategoryEditResource, ProductCategory>();
                    cfg.CreateMap<ProductCategory, ProductCategoryEditResource>();
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/ProductCategoryAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.ProductCategories, loadOptions);
        }

        // GET: api/ProductCategoryAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            ProductCategory data = await _db.ProductCategories.FindAsync(id);

            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductCategory, ProductCategoryEditResource>(data));
        }

        // PUT: api/ProductCategoryAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, ProductCategoryEditResource resource)
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

            ProductCategory data = await _db.ProductCategories.FindAsync(id);

            if (data is null)
            {
                return NotFound();
            }

            _mapper.Map(resource, data);
            data.ModifyUser = User.Identity.GetUserId();
            data.ModifyTime = DateTime.Now;

            _db.Entry(data).State = EntityState.Modified;

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

        // POST: api/ProductCategoryAPI
        public async Task<IHttpActionResult> PostAsync(ProductCategoryCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductCategory data = _mapper.Map<ProductCategoryCreateResource, ProductCategory>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.ProductCategories.Add(data);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data.Id);
        }

        // DELETE: api/ProductCategoryAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            ProductCategory data = await _db.ProductCategories.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            _db.ProductCategories.Remove(data);

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