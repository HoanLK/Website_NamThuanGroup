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
using CMS.Models;
using CMS.Areas.Admin.Models;

namespace CMS.APIs
{
    public class CategoryProjectAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/CategoryProjectAPI
        public IQueryable<CategoryProject> GetCategoryProjects()
        {
            return db.CategoryProjects;
        }

        //Get for ModelView
        // GET: api/CategoryProjectAPI
        public IQueryable<CategoryProjectViewModel> GetCategoryProjects(bool viewmodel, string type)
        {
            if (viewmodel)
            {
                if (type == "select")
                {
                    var model = (
                        from cp in db.CategoryProjects
                        select new CategoryProjectViewModel()
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
                        from cp in db.CategoryProjects
                        select new CategoryProjectViewModel()
                        {
                            Id = cp.Id,
                            ParentId = cp.ParentId,
                            Title = cp.Title,
                            Note = cp.Note,
                            Published = cp.Published,
                            Alias = cp.Alias,
                            ProjectNumber = db.Projects.Where(p => p.CategoryId == cp.Id).Count()
                        }
                    );

                    return model;
                }
            }

            return null;
        }

        // GET: api/CategoryProjectAPI/5
        [ResponseType(typeof(CategoryProject))]
        public IHttpActionResult GetCategoryProject(int id)
        {
            CategoryProject categoryProject = db.CategoryProjects.Find(id);
            if (categoryProject == null)
            {
                return NotFound();
            }

            return Ok(categoryProject);
        }

        // PUT: api/CategoryProjectAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryProject(int id, CategoryProject categoryProject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryProject.Id)
            {
                return BadRequest();
            }

            db.Entry(categoryProject).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryProjectExists(id))
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

        // POST: api/CategoryProjectAPI
        [ResponseType(typeof(CategoryProject))]
        public IHttpActionResult PostCategoryProject(CategoryProject categoryProject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryProjects.Add(categoryProject);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryProject.Id }, categoryProject);
        }

        //Delete 1 record
        // DELETE: api/CategoryProjectAPI/5
        [ResponseType(typeof(CategoryProject))]
        public IHttpActionResult DeleteCategoryProject(int id)
        {
            CategoryProject categoryProject = db.CategoryProjects.Find(id);
            if (categoryProject == null)
            {
                return NotFound();
            }

            RemoveParent(categoryProject.Id);
            RemoveCategoryId(categoryProject.Id);
            db.CategoryProjects.Remove(categoryProject);
            db.SaveChanges();

            return Ok(categoryProject);
        }

        //Delete list
        // DELETE: api/CategoryProjectAPI?ids=...
        public int DeleteCategoryProject(string ids)
        {
            var listIds = ids.Split(',');
            List<CategoryProject> categoryProjects = new List<CategoryProject>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var categoryProject = db.CategoryProjects.Find(id);
                    if (categoryProject != null)
                    {
                        RemoveParent(categoryProject.Id);
                        RemoveCategoryId(categoryProject.Id);
                        categoryProjects.Add(categoryProject);
                    }
                }
            }

            db.CategoryProjects.RemoveRange(categoryProjects);

            try
            {
                db.SaveChanges();
                return 1;
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
        private bool CategoryProjectExists(int id)
        {
            return db.CategoryProjects.Count(e => e.Id == id) > 0;
        }

        //Remove Parent
        private void RemoveParent(int id)
        {
            var categoryProjects = db.CategoryProjects.Where(p => p.ParentId == id).ToList();

            if (categoryProjects != null)
            {
                foreach (var item in categoryProjects)
                {
                    item.ParentId = null;
                }

                db.SaveChanges();
            }
        }

        //Remove Category
        private void RemoveCategoryId(int id)
        {
            var projects = db.Projects.Where(p => p.CategoryId == id).ToList();

            if (projects != null)
            {
                foreach (var item in projects)
                {
                    item.CategoryId = null;
                }

                db.SaveChanges();
            }
        }
    }
}