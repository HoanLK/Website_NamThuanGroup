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
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public PostAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<PostCreateResource, Post>();
                    // Edit
                    cfg.CreateMap<PostEditResource, Post>();
                    cfg.CreateMap<Post, PostEditResource>();
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/PostAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.Posts, loadOptions);
        }

        // GET: api/PostAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Post data = await _db.Posts.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Post, PostEditResource>(data));
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

            if (resource is null)
            {
                return BadRequest();
            }

            Post data = await _db.Posts.FindAsync(id);

            if (data == null)
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

        // POST: api/PostAPI
        public async Task<IHttpActionResult> PostAsync(PostCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Post data = _mapper.Map<PostCreateResource, Post>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.Posts.Add(data);

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

        // DELETE: api/PostAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Post data = await _db.Posts.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            _db.Posts.Remove(data);

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