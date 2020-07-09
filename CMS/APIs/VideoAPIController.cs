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
    public class VideoAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/VideoAPI
        public IQueryable<Video> GetVideos()
        {
            return db.Videos;
        }

        //Get for ModelView
        // GET: api/VideoAPI
        public IQueryable<VideoViewModel> GetVideos(bool viewmodel, string type)
        {
            if (viewmodel)
            {
                if (type == "table")
                {
                    var model = (
                        from cp in db.Videos
                        orderby cp.TimeCreated descending
                        select new VideoViewModel()
                        {
                            Id = cp.Id,
                            Published = cp.Published,
                            TimeCreated = cp.TimeCreated,
                            Title = cp.Title,
                            Views = cp.Views
                        }
                    );

                    return model;
                }
            }

            return null;
        }

        // GET: api/VideoAPI/5
        [ResponseType(typeof(Video))]
        public IHttpActionResult GetVideo(int id)
        {
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return NotFound();
            }

            return Ok(video);
        }

        // PUT: api/VideoAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVideo(int id, Video video)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != video.Id)
            {
                return BadRequest();
            }

            db.Entry(video).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoExists(id))
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

        // POST: api/VideoAPI
        [ResponseType(typeof(Video))]
        public IHttpActionResult PostVideo(Video video)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Videos.Add(video);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = video.Id }, video);
        }

        //Delete 1 record
        // DELETE: api/VideoAPI/5
        [ResponseType(typeof(Video))]
        public IHttpActionResult DeleteVideo(int id)
        {
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return NotFound();
            }

            db.Videos.Remove(video);
            db.SaveChanges();

            return Ok(video);
        }

        //Delete list
        // DELETE: api/VideoAPI?ids=...
        public int DeleteVideo(string ids)
        {
            var listIds = ids.Split(',');
            List<Video> videos = new List<Video>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var video = db.Videos.Find(id);
                    if (video != null)
                    {
                        videos.Add(video);
                    }
                }
            }

            db.Videos.RemoveRange(videos);

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

        private bool VideoExists(int id)
        {
            return db.Videos.Count(e => e.Id == id) > 0;
        }
    }
}