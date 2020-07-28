using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Component;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    [Authorize]
    public class ComponentAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public ComponentAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<ComponentCreateResource, Component>();
                    // Edit
                    cfg.CreateMap<ComponentEditResource, Component>();
                    cfg.CreateMap<Component, ComponentEditResource>().ForMember(r => r.Images, opt => opt.MapFrom(c => c.ComponentImages.Select(p => p.Link)));
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/ComponentAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.Components, loadOptions);
        }

        // GET: api/ComponentAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Component data = await _db.Components.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Component, ComponentEditResource>(data));
        }

        // PUT: api/ComponentAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, ComponentEditResource resource)
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

            Component data = await _db.Components.FindAsync(id);

            if (data is null)
            {
                return NotFound();
            }

            _mapper.Map(resource, data);
            data.ModifyUser = User.Identity.GetUserId();
            data.ModifyTime = DateTime.Now;

            _db.Entry(data).State = EntityState.Modified;

            // Delete Old Images
            IQueryable<ComponentImage> oldImages = _db.ComponentImages.Where(p => p.ComponentId == data.Id);
            _db.ComponentImages.RemoveRange(oldImages);

            // Add New Images
            List<ComponentImage> images = new List<ComponentImage>();
            foreach (string link in resource.Images)
            {
                images.Add(new ComponentImage
                {
                    ComponentId = data.Id,
                    Link = link
                });
            }
            _db.ComponentImages.AddRange(images);

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

        // POST: api/ComponentAPI
        public async Task<IHttpActionResult> PostAsync(ComponentCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Component data = _mapper.Map<ComponentCreateResource, Component>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.Components.Add(data);

            try
            {
                await _db.SaveChangesAsync();

                // Add Media Links
                List<ComponentImage> images = new List<ComponentImage>();
                foreach (string link in resource.Images)
                {
                    images.Add(new ComponentImage
                    {
                        ComponentId = data.Id,
                        Link = link
                    });
                }
                _db.ComponentImages.AddRange(images);
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data.Id);
        }

        // DELETE: api/ComponentAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Component data = await _db.Components.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            // Delete Component Images
            _db.ComponentImages.RemoveRange(_db.ComponentImages.Where(p => p.ComponentId == id));

            // Delete Component
            _db.Components.Remove(data);

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