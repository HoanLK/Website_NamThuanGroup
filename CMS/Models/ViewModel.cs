using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models
{
    public class ViewModel
    {
    }

    //Header Top
    public class HeaderTopViewModel
    {
        public InfoCompany InfoCompany { get; set; }
    }

    //Footer
    public class FooterViewModel
    {
        public InfoCompany InfoCompany { get; set; }
    }

    //Sidebar1
    public class Sidebar1ViewModel
    {
        public List<Post> TinTucs { get; set; }
        public List<Video> Videos { get; set; }
    }

    //Home
    public class HomeViewModel
    {
        public List<Project> DuAnNoiBats { get; set; }
        public Post PhongThuyPostNewnest { get; set; }
        public List<Post> PhongThuyPosts { get; set; }
        public Post KienTrucPostNewnest { get; set; }
        public List<Post> KienTrucPosts { get; set; }
    }

    //Dự án
    public class ListDuAnViewModel
    {
        public List<Project> DuAns { get; set; }
    }
    public class ShowDuAnViewModel
    {
        public Project DuAn { get; set; }
        public List<ImageProject> Images { get; set; }
        public List<Project> DuAnKhacs { get; set; }
    }

    //Bài viết
    public class ListBaiVietViewModel
    {
        public CategoryPost DanhMuc { get; set; }
        public List<Post> BaiViets { get; set; }
        public List<Project> DuAnNoiBats { get; set; }
    }
    public class ShowBaiVietViewModel
    {
        public CategoryPost DanhMuc { get; set; }
        public Post BaiViet { get; set; }
        public List<Post> BaiVietKhacs { get; set; }
    }

    //Video
    public class ListVideoViewModel
    {
        public List<Video> Videos { get; set; }
        public List<Project> DuAnNoiBats { get; set; }
    }
    public class ShowVideoViewModel
    {
        public Video Video { get; set; }
        public List<Video> VideoKhacs { get; set; }
    }
}