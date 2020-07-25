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
        private readonly CMSEntities db = new CMSEntities();

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            // Set Title
            ViewBag.title = "Trang chủ";
            ViewBag.currentMenu = "Home";

            // Culture
            CultureInfo culture = CultureInfo.CurrentCulture;

            // Mapper
            var config = new MapperConfiguration(
                cfg => cfg.CreateMap<Component, ComponentViewModel>()
                          .ForMember(cvm => cvm.Id, opt => opt.MapFrom(c => c.Id))
                          .ForMember(cvm => cvm.Name, opt => opt.MapFrom(c => (culture.Name == "vi") ? c.VN_Name : c.EN_Name))
                          .ForMember(cvm => cvm.SubTitle, opt => opt.MapFrom(c => (culture.Name == "vi") ? c.VN_SubTitle : c.EN_SubTitle))
                          .ForMember(cvm => cvm.Content, opt => opt.MapFrom(c => (culture.Name == "vi") ? c.VN_Content : c.EN_Content))
                          .ForMember(cvm => cvm.Link, opt => opt.MapFrom(c => (culture.Name == "vi") ? c.VN_Link : c.EN_Link))
                          .ForMember(cvm => cvm.TextButton, opt => opt.MapFrom(c => (culture.Name == "vi") ? c.VN_TextButton : c.EN_TextButton))
                          .ForMember(cvm => cvm.IsSingleMedia, opt => opt.MapFrom(c => c.IsSingleMedia))
                          .ForMember(cvm => cvm.LinkMedia, opt => opt.MapFrom(c => c.LinkMedia))
                          .ForMember(cvm => cvm.ComponentImages, opt => opt.MapFrom(c => c.ComponentImages))
            );
            var mapper = new Mapper(config);


            HomeViewModel model = new HomeViewModel()
            {
                // 
                HienDaiTextComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:HienDaiTextComponent"))),
                HienDaiImage1Component = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:HienDaiImage1Component"))),
                HienDaiImage2Component = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:HienDaiImage2Component"))),
                TayNgheCaoTextComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:TayNgheCaoTextComponent"))),
                TayNgheCaoImageComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:TayNgheCaoImageComponent"))),
                DaDangChatLuongTextComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:DaDangChatLuongTextComponent"))),
                DaDangChatLuongImage1Component = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:DaDangChatLuongImage1Component"))),
                DaDangChatLuongImage2Component = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:DaDangChatLuongImage2Component"))),
                //
                NamThuanGroupComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:NamThuanGroupComponent"))),
                //
                CongNhanVienComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:CongNhanVienComponent"))),
                DienTichNhaMayComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:DienTichNhaMayComponent"))),
                ChiNhanhComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:ChiNhanhComponent"))),
                SanPhamNamComponent = mapper.Map<Component, ComponentViewModel>(await db.Components.FindAsync(GetComponentId("template:home:SanPhamNamComponent"))),

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
