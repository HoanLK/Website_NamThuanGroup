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
using System.Web.Http;
using System.Web.Http.Description;

namespace CMS.APIs
{
    public class PostCategoryAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/PostCategoryAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(db.CategoryPosts, loadOptions);
        }

        //Get for ModelView
        // GET: api/CategoryPostAPI
        public IQueryable<CategoryPostViewModel> GetCategoryPosts(bool viewmodel, string type)
        {
            if (viewmodel)
            {
                if (type == "select")
                {
                    var model = (
                        from cp in db.CategoryPosts
                        select new CategoryPostViewModel()
                        {
                            Id = cp.Id,
                            ParentId = cp.ParentId,
                            Title = cp.Title
                        }
                    );

                    return model;
                }
                if (type == "table")
                {
                    var model = (
                        from cp in db.CategoryPosts
                        select new CategoryPostViewModel()
                        {
                            Id = cp.Id,
                            ParentId = cp.ParentId,
                            Title = cp.Title,
                            Note = cp.Note,
                            Published = cp.Published,
                            Alias = cp.Alias,
                            PostNumber = db.Posts.Where(p => p.CategoryId == cp.Id).Count()
                        }
                    );

                    return model;
                }
            }

            return null;
        }

        // GET: api/CategoryPostAPI/5
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult GetCategoryPost(int id)
        {
            CategoryPost categoryPost = db.CategoryPosts.Find(id);
            if (categoryPost == null)
            {
                return NotFound();
            }

            return Ok(categoryPost);
        }

        // PUT: api/CategoryPostAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryPost(int id, CategoryPost categoryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryPost.Id)
            {
                return BadRequest();
            }

            db.Entry(categoryPost).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryPostExists(id))
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

        // POST: api/CategoryPostAPI
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult PostCategoryPost(CategoryPost categoryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string idCurrentUser = User.Identity.GetUserId();

            if (!string.IsNullOrEmpty(idCurrentUser))
            {
                categoryPost.UserId = idCurrentUser;
                categoryPost.TimeCreated = DateTime.Now;
            }
            else
            {
                return BadRequest();
            }

            db.CategoryPosts.Add(categoryPost);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryPost.Id }, categoryPost);
        }

        //Delete 1 record
        // DELETE: api/CategoryPostAPI/5
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult DeleteCategoryPost(int id)
        {
            CategoryPost categoryPost = db.CategoryPosts.Find(id);
            if (categoryPost == null)
            {
                return NotFound();
            }

            RemoveParent(categoryPost.Id);
            RemoveCategoryId(categoryPost.Id);

            db.CategoryPosts.Remove(categoryPost);
            db.SaveChanges();

            return Ok(categoryPost);
        }

        //Delete list
        // DELETE: api/CategoryPostAPI?ids=...
        public IHttpActionResult DeleteCategoryPost(string ids)
        {
            var listIds = ids.Split(',');
            List<CategoryPost> categoryPosts = new List<CategoryPost>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var categoryPost = db.CategoryPosts.Find(id);
                    if (categoryPost != null)
                    {
                        RemoveParent(categoryPost.Id);
                        RemoveCategoryId(categoryPost.Id);
                        categoryPosts.Add(categoryPost);
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

            db.CategoryPosts.RemoveRange(categoryPosts);

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
        private bool CategoryPostExists(int id)
        {
            return db.CategoryPosts.Count(e => e.Id == id) > 0;
        }

        //Remove Parent
        private void RemoveParent(int id)
        {
            var categoryPosts = db.CategoryPosts.Where(p => p.ParentId == id).ToList();

            if (categoryPosts != null)
            {
                foreach (var item in categoryPosts)
                {
                    item.ParentId = null;
                }

                db.SaveChanges();
            }
        }

        //Remove Category
        private void RemoveCategoryId(int id)
        {
            var posts = db.Posts.Where(p => p.CategoryId == id).ToList();

            if (posts != null)
            {
                foreach (var item in posts)
                {
                    item.CategoryId = null;
                }

                db.SaveChanges();
            }
        }
    }
}