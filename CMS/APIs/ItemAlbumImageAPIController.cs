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

namespace CMS.APIs
{
    public class ItemAlbumImageAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/ItemAlbumImageAPI
        public IQueryable<ItemAlbumImage> GetItemAlbumImages()
        {
            return db.ItemAlbumImages;
        }

        //Get By Request
        // GET: api/ItemAlbumImageAPI?request=...&&value=...
        public IQueryable<ItemAlbumImage> GetItemAlbumImages(string request, string value)
        {
            if (request == "ByAlbum" && value != null)
            {
                if (int.TryParse(value, out int idAlbum))
                {
                    return db.ItemAlbumImages.Where(p => p.AlbumId == idAlbum);
                }
            }

            return null;
        }

        // GET: api/ItemAlbumImageAPI/5
        [ResponseType(typeof(ItemAlbumImage))]
        public IHttpActionResult GetItemAlbumImage(int id)
        {
            ItemAlbumImage itemAlbumImage = db.ItemAlbumImages.Find(id);
            if (itemAlbumImage == null)
            {
                return NotFound();
            }

            return Ok(itemAlbumImage);
        }

        // PUT: api/ItemAlbumImageAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutItemAlbumImage(int id, ItemAlbumImage itemAlbumImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemAlbumImage.Id)
            {
                return BadRequest();
            }

            db.Entry(itemAlbumImage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemAlbumImageExists(id))
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

        // POST: api/ItemAlbumImageAPI
        [ResponseType(typeof(ItemAlbumImage))]
        public IHttpActionResult PostItemAlbumImage(ItemAlbumImage itemAlbumImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ItemAlbumImages.Add(itemAlbumImage);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = itemAlbumImage.Id }, itemAlbumImage);
        }

        //Delete 1 record
        // DELETE: api/ItemAlbumImageAPI/5
        [ResponseType(typeof(ItemAlbumImage))]
        public IHttpActionResult DeleteItemAlbumImage(int id)
        {
            ItemAlbumImage itemAlbumImage = db.ItemAlbumImages.Find(id);
            if (itemAlbumImage == null)
            {
                return NotFound();
            }

            db.ItemAlbumImages.Remove(itemAlbumImage);
            db.SaveChanges();

            return Ok(itemAlbumImage);
        }

        //Delete list
        // DELETE: api/ItemAlbumImageAPI?ids=...
        public int DeleteItemAlbumImage(string ids)
        {
            var listIds = ids.Split(',');
            List<ItemAlbumImage> images = new List<ItemAlbumImage>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var image = db.ItemAlbumImages.Find(id);
                    if (image != null)
                    {
                        images.Add(image);
                    }
                }
            }

            db.ItemAlbumImages.RemoveRange(images);

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
        // DELETE: api/ItemAlbumImageAPI?request=...&&value==
        public int DeleteItemAlbumImage(string request, string value)
        {
            if (request == "ByAlbum" && value != null)
            {
                if (int.TryParse(value, out int idAlbum))
                {
                    var images = db.ItemAlbumImages.Where(p => p.AlbumId == idAlbum).ToList();

                    if (images != null)
                    {
                        db.ItemAlbumImages.RemoveRange(images);

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

        private bool ItemAlbumImageExists(int id)
        {
            return db.ItemAlbumImages.Count(e => e.Id == id) > 0;
        }
    }
}