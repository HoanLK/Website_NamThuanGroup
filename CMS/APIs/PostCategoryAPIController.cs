using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.PostCategory;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    [Authorize]
    public class PostCategoryAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public PostCategoryAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<PostCategoryCreateResource, PostCategory>();
                    // Edit
                    cfg.CreateMap<PostCategoryEditResource, PostCategory>();
                    cfg.CreateMap<PostCategory, PostCategoryEditResource>();
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/PostCategoryAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.PostCategories, loadOptions);
        }

        // GET: api/PostCategoryAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            PostCategory data = await _db.PostCategories.FindAsync(id);

            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PostCategory, PostCategoryEditResource>(data));
        }

        // PUT: api/PostCategoryAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, PostCategoryEditResource resource)
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

            PostCategory data = await _db.PostCategories.FindAsync(id);

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

        // POST: api/PostCategoryAPI
        public async Task<IHttpActionResult> PostAsync(PostCategoryCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PostCategory data = _mapper.Map<PostCategoryCreateResource, PostCategory>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.PostCategories.Add(data);

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

        // DELETE: api/PostCategoryAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            PostCategory data = await _db.PostCategories.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            _db.PostCategories.Remove(data);

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