using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Post;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    [Authorize]
    public class PostAPIController : ApiController
    {
        private readonly CMSEntities db = new CMSEntities();

        // GET: api/PostAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(db.Posts, loadOptions);
        }

        // GET: api/PostAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Post post = await db.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Post, PostEditResource>());
            var mapper = new Mapper(config);

            return Ok(mapper.Map<Post, PostEditResource>(post));
        }

        // PUT: api/PostAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, PostEditResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != resource.Id)
            {
                return BadRequest();
            }

            var post = await db.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PostEditResource, Post>());
            var mapper = new Mapper(config);

            mapper.Map<PostEditResource, Post>(resource, post);
            post.ModifyUser = User.Identity.GetUserId();
            post.ModifyTime = DateTime.Now;

            db.Entry(post).State = EntityState.Modified;

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

        // POST: api/PostAPI
        public async Task<IHttpActionResult> PostAsync(PostCreateResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PostCreateResource, Post>());
            var mapper = new Mapper(config);

            var post = mapper.Map<PostCreateResource, Post>(resource);
            post.CreateUser = User.Identity.GetUserId();
            post.CreateTime = DateTime.Now;

            db.Posts.Add(post);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(post.Id);
        }

        // DELETE: api/PostAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Post post = await db.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);

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