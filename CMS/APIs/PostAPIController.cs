using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Post;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace CMS.APIs
{
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
        public async Task<IHttpActionResult> Get(int id)
        {
            Post post = await db.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Post, PostResource>());
            var mapper = new Mapper(config);

            return Ok(mapper.Map<Post, PostResource>(post));
        }

        // PUT: api/PostAPI/5
        public IHttpActionResult Put(int id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }

        // POST: api/PostAPI
        public IHttpActionResult Post(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            post.CreateUser = User.Identity.GetUserId();
            post.CreateTime = DateTime.Now;

            db.Posts.Add(post);

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }

        // DELETE: api/PostAPI/5
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> Delete(int id)
        {
            Post post = await db.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }
    }
}