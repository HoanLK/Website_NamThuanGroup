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
    public class AlbumImageAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/AlbumImageAPI
        public IQueryable<AlbumImage> GetAlbumImages()
        {
            return db.AlbumImages;
        }

        //Get for ModelView
        // GET: api/AlbumImageAPI
        public IQueryable<AlbumImageViewModel> GetAlbumImages(bool viewmodel, string type)
        {
            if (viewmodel)
            {
                if (type == "table")
                {
                    var model = (
                        from cp in db.AlbumImages
                        orderby cp.TimeCreated descending
                        select new AlbumImageViewModel()
                        {
                            Id = cp.Id,
                            Published = cp.Published,
                            TimeCreated = cp.TimeCreated,
                            Title = cp.Title,
                            Views = cp.Views,
                        }
                    );

                    return model;
                }
            }

            return null;
        }

        // GET: api/AlbumImageAPI/5
        [ResponseType(typeof(AlbumImage))]
        public IHttpActionResult GetAlbumImage(int id)
        {
            AlbumImage albumImage = db.AlbumImages.Find(id);
            if (albumImage == null)
            {
                return NotFound();
            }

            return Ok(albumImage);
        }

        // PUT: api/AlbumImageAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAlbumImage(int id, AlbumImage albumImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != albumImage.Id)
            {
                return BadRequest();
            }

            db.Entry(albumImage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumImageExists(id))
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

        // POST: api/AlbumImageAPI
        [ResponseType(typeof(AlbumImage))]
        public IHttpActionResult PostAlbumImage(AlbumImage albumImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AlbumImages.Add(albumImage);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = albumImage.Id }, albumImage);
        }

        // DELETE: api/AlbumImageAPI/5
        [ResponseType(typeof(AlbumImage))]
        public IHttpActionResult DeleteAlbumImage(int id)
        {
            AlbumImage albumImage = db.AlbumImages.Find(id);
            if (albumImage == null)
            {
                return NotFound();
            }

            db.AlbumImages.Remove(albumImage);
            db.SaveChanges();

            return Ok(albumImage);
        }

        //Delete list
        // DELETE: api/AlbumImageAPI?ids=...
        public int DeleteAlbumImage(string ids)
        {
            var listIds = ids.Split(',');
            List<AlbumImage> albumImages = new List<AlbumImage>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var albumImage = db.AlbumImages.Find(id);
                    if (albumImage != null)
                    {
                        DeleteImage(albumImage.Id);

                        albumImages.Add(albumImage);
                    }
                }
            }

            db.AlbumImages.RemoveRange(albumImages);

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

        private bool AlbumImageExists(int id)
        {
            return db.AlbumImages.Count(e => e.Id == id) > 0;
        }

        //DeleteImage
        private void DeleteImage(int id)
        {
            var images = db.ItemAlbumImages.Where(p => p.AlbumId == id).ToList();
            db.ItemAlbumImages.RemoveRange(images);
            db.SaveChanges();
        }
    }
}