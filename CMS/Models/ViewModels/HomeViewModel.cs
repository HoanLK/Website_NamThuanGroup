using System.Collections.Generic;

namespace CMS.Models.ViewModels
{
    public class HomeViewModel
    {
        public ModuleViewModel GioiThieuDacDiem { get; set; }
        public ModuleViewModel GioiThieuNamThuanGroup { get; set; }
        public ModuleViewModel Counter { get; set; }
        public ModuleViewModel QuyTrinhSanXuat { get; set; }
        public ModuleViewModel QuyTrinhKiemSoatChatLuong { get; set; }
        public List<ProductCategoryViewModel> ProductCategories { get; set; }
        public List<ProductViewModel> Products { get; set; }
        public List<Certificate> Certificates { get; set; }
        public SendEmailContactViewModel EmailContact { get; set; }
    }
}