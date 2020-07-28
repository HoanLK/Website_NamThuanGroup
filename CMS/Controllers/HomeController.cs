using AutoMapper;
using CMS.Helpers;
using CMS.Models;
using CMS.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Globalization;
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
            // Set Title
            ViewBag.title = "Trang chủ";
            ViewBag.currentMenu = "Home";

            _culture = CultureInfo.CurrentCulture;

            HomeViewModel model = new HomeViewModel()
            {
                GioiThieuDacDiem = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:GioiThieuDacDiem"))),
                GioiThieuNamThuanGroup = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:GioiThieuNamThuanGroup"))),
                Counter = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:Counter"))),
                QuyTrinhSanXuat = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:QuyTrinhSanXuat"))),
                QuyTrinhKiemSoatChatLuong = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:home:QuyTrinhKiemSoatChatLuong"))),
            };

            return View(model);
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
                cookie.Expires = DateTime.Now.AddYears(1);
            }
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
