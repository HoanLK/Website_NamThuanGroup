using CMS.Areas.Admin.Models;
using CMS.Models;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace CMS.APIs
{
    public class PostAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        //Get Datasource Devextreme
        // GET: api/PostAPI
        public HttpResponseMessage GetPosts(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return Request.CreateResponse(DataSourceLoader.Load(db.Posts.Select(p => new PostViewModel()
            {
                Id = p.Id,
                CategoryId = p.CategoryId,
                Published = p.Published,
                TimeCreated = p.TimeCreated,
                Title = p.Title,
                Views = p.Views
            }), loadOptions));
        }

        // GET: api/PostAPI/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT: api/PostAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPost(int id, Post post)
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
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PostAPI
        [ResponseType(typeof(Post))]
        public IHttpActionResult PostPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string idCurrentUser = User.Identity.GetUserId();

            if (!string.IsNullOrEmpty(idCurrentUser))
            {
                post.UserId = idCurrentUser;
                post.TimeCreated = DateTime.Now;
            }
            else
            {
                return BadRequest();
            }

            db.Posts.Add(post);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = post.Id }, post);
        }

        //Delete 1 Record
        // DELETE: api/PostAPI/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }

        //Delete List
        // DELETE: api/PostAPI?ids=1,2,3
        public IHttpActionResult DeletePost(string ids)
        {
            var listIds = ids.Split(',');
            List<Post> posts = new List<Post>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var post = db.Posts.Find(id);
                    if (post != null)
                    {
                        posts.Add(post);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }

            db.Posts.RemoveRange(posts);

            try
            {
                db.SaveChanges();
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //Check Exits
        private bool PostExists(int id)
        {
            return db.Posts.Count(e => e.Id == id) > 0;
        }
    }
}