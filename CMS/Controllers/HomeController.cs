using AutoMapper;
using CMS.Helpers;
using CMS.Models;
using CMS.Models.ViewModels;
using CMS.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class HomeController : BaseController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;
        private CultureInfo _culture;

        public HomeController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Component => Component View Model
                    cfg.CreateMap<Component, ComponentViewModel>()
                          .ForMember(cvm => cvm.Id, opt => opt.MapFrom(c => c.Id))
                          .ForMember(cvm => cvm.MainTitle, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_MainTitle : c.EN_MainTitle))
                          .ForMember(cvm => cvm.SubTitle, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_SubTitle : c.EN_SubTitle))
                          .ForMember(cvm => cvm.Content, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_Content : c.EN_Content))
                          .ForMember(cvm => cvm.Link, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_Link : c.EN_Link))
                          .ForMember(cvm => cvm.TextButton, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_TextButton : c.EN_TextButton))
                          .ForMember(cvm => cvm.IsSingleMedia, opt => opt.MapFrom(c => c.IsSingleMedia))
                          .ForMember(cvm => cvm.LinkMedia, opt => opt.MapFrom(c => c.LinkMedia))
                          .ForMember(cvm => cvm.AnimateIn, opt => opt.MapFrom(c => c.AnimateIn))
                          .ForMember(cvm => cvm.AnimateOut, opt => opt.MapFrom(c => c.AnimateOut))
                          .ForMember(cvm => cvm.Timeout, opt => opt.MapFrom(c => c.Timeout))
                          .ForMember(cvm => cvm.Icon, opt => opt.MapFrom(c => c.Icon))
                          .ForMember(cvm => cvm.SortOrder, opt => opt.MapFrom(c => c.SortOrder))
                          .ForMember(cvm => cvm.ComponentImages, opt => opt.MapFrom(c => c.ComponentImages));
                    // Module => Module View Model
                    cfg.CreateMap<Module, ModuleViewModel>()
                        .ForMember(mv => mv.Name, opt => opt.MapFrom(m => m.Name))
                        .ForMember
                        (
                            mv => mv.Components,
                            opt => opt.MapFrom
                            (
                                m => _mapper.Map<ICollection<Component>, ICollection<ComponentViewModel>>(m.Components)
                            )
                        );
                }
            );
            _mapper = new Mapper(config);
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var info = _db.Infoes.Find(1);

            ViewBag.currentMenu = "Home";
            // SEO
            ViewBag.title = Resources.MenuHome;
            ViewBag.keywords = info.Keywords;
            ViewBag.description = info.Description;
            ViewBag.url = info.URL;
            ViewBag.image = info.URL + info.Image;

            _culture = CultureInfo.CurrentCulture;

            HomeViewModel model = new HomeViewModel()
            {
                EmailContact = new SendEmailContactViewModel(),
                GioiThieuDacDiem = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:GioiThieuDacDiem"))),
                QuyTrinhSanXuat = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:QuyTrinhSanXuat"))),
                QuyTrinhKiemSoatChatLuong = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:QuyTrinhKiemSoatChatLuong"))),
                ProductCategories = await _db.ProductCategories.Where(p => p.Published == true)
                                                               .OrderBy(p => p.SortOrder)
                                                               .Select(p => new ProductCategoryViewModel
                                                               {
                                                                   Id = p.Id,
                                                                   Name = (_culture.Name == "vi") ? p.VN_Name : p.EN_Name,
                                                                   Image = p.Image,
                                                                   Featured = p.Featured,
                                                                   SortOrder = p.SortOrder
                                                               }).AsNoTracking().ToListAsync()
            };

            return View(model);
        }

        // POST: EmailContact
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EmailContact(SendEmailContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Get Template Email
                string template;
                using (var sr = new StreamReader(Server.MapPath("\\Content\\Email\\") + "Contact.html"))
                {
                    template = await sr.ReadToEndAsync();

                    string bodyEmail = string.Format(template, model.Name, model.Email, model.PhoneNumber, model.Company, model.Content);

                    // Send Email
                    EmailService emailService = new EmailService();
                    var result = await emailService.SendEmailAsync(Resources.CompanyEmail, "Thông tin khách liên hệ", bodyEmail);

                    if (result == true)
                    {
                        return Json(new { result = 1 });
                    }
                }
            }

            return Json(new { result = 0 });
        }

        // Set Culture
        public ActionResult SetCulture(string culture)
        {
            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);
            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = culture;   // update cookie value
            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = culture;
                cookie.Expires = DateTime.Now.AddMonths(1);
            }
            cookie.SameSite = SameSiteMode.Lax;
            Response.Cookies.Add(cookie);

            return Json(culture, JsonRequestBehavior.AllowGet);
        }

        private int? GetComponentId(string key)
        {
            if (int.TryParse(ConfigurationManager.AppSettings[key], out int id))
            {
                return id;
            }

            return null;
        }
    }
}
