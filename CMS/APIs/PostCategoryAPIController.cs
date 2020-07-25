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
        private readonly CMSEntities db = new CMSEntities();

        // GET: api/PostCategoryAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(db.PostCategories, loadOptions);
        }

        // GET: api/PostCategoryAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            PostCategory postCategory = await db.PostCategories.FindAsync(id);
            if (postCategory == null)
            {
                return NotFound();
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PostCategory, PostCategoryEditResource>());
            var mapper = new Mapper(config);

            return Ok(mapper.Map<PostCategory, PostCategoryEditResource>(postCategory));
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

            var postCategory = await db.PostCategories.FindAsync(id);

            if (postCategory == null)
            {
                return NotFound();
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PostCategoryEditResource, PostCategory>());
            var mapper = new Mapper(config);

            mapper.Map<PostCategoryEditResource, PostCategory>(resource, postCategory);
            postCategory.ModifyUser = User.Identity.GetUserId();
            postCategory.ModifyTime = DateTime.Now;

            db.Entry(postCategory).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PostCategoryCreateResource, PostCategory>());
            var mapper = new Mapper(config);

            var postCategory = mapper.Map<PostCategoryCreateResource, PostCategory>(resource);
            postCategory.CreateUser = User.Identity.GetUserId();
            postCategory.CreateTime = DateTime.Now;

            db.PostCategories.Add(postCategory);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(postCategory.Id);
        }

        // DELETE: api/PostCategoryAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            PostCategory postCategory = await db.PostCategories.FindAsync(id);
            if (postCategory == null)
            {
                return NotFound();
            }

            db.PostCategories.Remove(postCategory);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }
    }
}