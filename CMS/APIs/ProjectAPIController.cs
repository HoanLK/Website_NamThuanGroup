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
    public class ProjectAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/ProjectAPI
        public IQueryable<Project> GetProjects()
        {
            return db.Projects;
        }

        //Get for ModelView
        // GET: api/ProjectAPI
        public IQueryable<ProjectViewModel> GetProjects(bool viewmodel, string type)
        {
            if (viewmodel)
            {
                if (type == "table")
                {
                    var model = (
                        from cp in db.Projects
                        orderby cp.TimeCreated descending
                        select new ProjectViewModel()
                        {
                            Id = cp.Id,
                            CategoryId = cp.CategoryId,
                            Featured = cp.Featured,
                            Published = cp.Published,
                            TimeCreated = cp.TimeCreated,
                            Title = cp.Title,
                            Views = cp.Views,
                            MucGia = cp.MucGia
                        }
                    );

                    return model;
                }
            }

            return null;
        }

        // GET: api/ProjectAPI/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult GetProject(int id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        // PUT: api/ProjectAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProject(int id, Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != project.Id)
            {
                return BadRequest();
            }

            db.Entry(project).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        //POST: api/ProjectAPI
       [ResponseType(typeof(Project))]
        public IHttpActionResult PostProject(Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Projects.Add(project);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = project.Id }, project);
        }


        // DELETE: api/ProjectAPI/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult DeleteProject(int id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return NotFound();
            }

            DeleteImage(project.Id);
            db.Projects.Remove(project);
            db.SaveChanges();

            return Ok(project);
        }

        //Delete list
        // DELETE: api/ProjectAPI?ids=...
        public int DeleteProject(string ids)
        {
            var listIds = ids.Split(',');
            List<Project> projects = new List<Project>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var project = db.Projects.Find(id);
                    if (project != null)
                    {
                        DeleteImage(project.Id);

                        projects.Add(project);
                    }
                }
            }

            db.Projects.RemoveRange(projects);

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

        private bool ProjectExists(int id)
        {
            return db.Projects.Count(e => e.Id == id) > 0;
        }

        //DeleteImage
        private void DeleteImage(int id)
        {
            var images = db.ImageProjects.Where(p => p.ProjectId == id).ToList();
            db.ImageProjects.RemoveRange(images);
            db.SaveChanges();
        }
    }
}