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
using Newtonsoft.Json.Linq;

namespace CMS.APIs
{
    public class ImageProjectAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/ImageProjectAPI
        public IQueryable<ImageProject> GetImageProjects()
        {
            return null;
        }

        //Get By Request
        // GET: api/ImageProjectAPI?request=...&&value=...
        public IQueryable<ImageProject> GetImageProjects(string request, string value)
        {
            if(request == "ByProject" && value != null)
            {
                if(int.TryParse(value, out int idProject))
                {
                    return db.ImageProjects.Where(p => p.ProjectId == idProject);
                }
            }

            return null;
        }

        // GET: api/ImageProjectAPI/5
        [ResponseType(typeof(ImageProject))]
        public IHttpActionResult GetImageProject(int id)
        {
            ImageProject imageProject = db.ImageProjects.Find(id);
            if (imageProject == null)
            {
                return NotFound();
            }

            return Ok(imageProject);
        }

        // PUT: api/ImageProjectAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImageProject(int id, ImageProject imageProject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imageProject.Id)
            {
                return BadRequest();
            }

            db.Entry(imageProject).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageProjectExists(id))
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

        //Create 1 Record
        // POST: api/ImageProjectAPI
        [ResponseType(typeof(ImageProject))]
        public IHttpActionResult PostImageProject(ImageProject imageProject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ImageProjects.Add(imageProject);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imageProject.Id }, imageProject);
        }

        //Delete 1 record
        // DELETE: api/ImageProjectAPI/5
        [ResponseType(typeof(ImageProject))]
        public IHttpActionResult DeleteImageProject(int id)
        {
            ImageProject imageProject = db.ImageProjects.Find(id);
            if (imageProject == null)
            {
                return NotFound();
            }

            db.ImageProjects.Remove(imageProject);
            db.SaveChanges();

            return Ok(imageProject);
        }

        //Delete list
        // DELETE: api/ImageProjectAPI?ids=...
        public int DeleteImageProject(string ids)
        {
            var listIds = ids.Split(',');
            List<ImageProject> images = new List<ImageProject>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var image = db.ImageProjects.Find(id);
                    if (image != null)
                    {
                        images.Add(image);
                    }
                }
            }

            db.ImageProjects.RemoveRange(images);

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

        //Delete By Request
        // DELETE: api/ImageProjectAPI?request=...&&value==
        public int DeleteImageProject(string request, string value)
        {
            if(request == "ByProject" && value != null)
            {
                if (int.TryParse(value, out int idProject))
                {
                    var images = db.ImageProjects.Where(p => p.ProjectId == idProject).ToList();

                    if(images != null)
                    {
                        db.ImageProjects.RemoveRange(images);

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
                }
            }

            return 0;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImageProjectExists(int id)
        {
            return db.ImageProjects.Count(e => e.Id == id) > 0;
        }
    }
}