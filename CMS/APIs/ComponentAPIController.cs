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
        private readonly CMSEntities db = new CMSEntities();

        // GET: api/ComponentAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(db.Components, loadOptions);
        }

        // GET: api/ComponentAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Component component = await db.Components.FindAsync(id);
            if (component == null)
            {
                return NotFound();
            }

            // Mapper
            var config = new MapperConfiguration(
                cfg => cfg.CreateMap<Component, ComponentEditResource>().ForMember(r => r.Links, opt => opt.MapFrom(c => c.ComponentImages.Select(p => p.Link)))
            );
            var mapper = new Mapper(config);

            return Ok(mapper.Map<Component, ComponentEditResource>(component));
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

            Component component = await db.Components.FindAsync(id);

            if (component == null)
            {
                return NotFound();
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<ComponentEditResource, Component>());
            var mapper = new Mapper(config);

            mapper.Map<ComponentEditResource, Component>(resource, component);
            component.ModifyUser = User.Identity.GetUserId();
            component.ModifyTime = DateTime.Now;

            db.Entry(component).State = EntityState.Modified;

            // Delete Old Images
            var oldImages = db.ComponentImages.Where(p => p.ComponentId == component.Id);
            db.ComponentImages.RemoveRange(oldImages);

            // Add New Images
            List<ComponentImage> images = new List<ComponentImage>();
            foreach (var link in resource.Links)
            {
                images.Add(new ComponentImage
                {
                    ComponentId = component.Id,
                    Link = link
                });
            }
            db.ComponentImages.AddRange(images);

            try
            {
                await db.SaveChangesAsync();
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Mapper
            var config = new MapperConfiguration(cfg => cfg.CreateMap<ComponentCreateResource, Component>());
            var mapper = new Mapper(config);

            var component = mapper.Map<ComponentCreateResource, Component>(resource);
            component.CreateUser = User.Identity.GetUserId();
            component.CreateTime = DateTime.Now;

            db.Components.Add(component);

            try
            {
                await db.SaveChangesAsync();

                // Add Media Links
                List<ComponentImage> images = new List<ComponentImage>();
                foreach (var link in resource.Links)
                {
                    images.Add(new ComponentImage
                    {
                        ComponentId = component.Id,
                        Link = link
                    });
                }
                db.ComponentImages.AddRange(images);
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(component.Id);
        }

        // DELETE: api/ComponentAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Component component = await db.Components.FindAsync(id);
            if (component == null)
            {
                return NotFound();
            }

            // Delete Component Images
            db.ComponentImages.RemoveRange(db.ComponentImages.Where(p => p.ComponentId == id));

            // Delete Component
            db.Components.Remove(component);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }
    }
}