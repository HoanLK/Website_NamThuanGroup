using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Areas.Admin.Models
{
    public class ViewModel
    {

    }

    public class CategoryPostViewModel
    {
        public int Id { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public bool Published { get; set; }
        public string Note { get; set; }
        public float PostNumber { get; set; }
    }

    public class PostViewModel
    {
        public int Id { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string Title { get; set; }
        public bool Featured { get; set; }
        public bool Published { get; set; }
        public Nullable<double> Views { get; set; }
        public DateTime TimeCreated { get; set; }
    }

    public class CategoryProjectViewModel
    {
        public int Id { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public bool Published { get; set; }
        public string Note { get; set; }
        public float ProjectNumber { get; set; }
    }

    public class ProjectViewModel
    {
        public int Id { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string Title { get; set; }
        public string MucGia { get; set; }
        public bool Published { get; set; }
        public bool Featured { get; set; }
        public double Views { get; set; }
        public DateTime TimeCreated { get; set; }
    }

    public class ProjectFullViewModel
    {
        public Project Project { get; set; }
        public List<ImageProject> Images { get; set; }
    }

    public class VideoViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Published { get; set; }
        public Nullable<double> Views { get; set; }
        public DateTime TimeCreated { get; set; }
    }

    public class AlbumImageViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Published { get; set; }
        public Nullable<double> Views { get; set; }
        public DateTime TimeCreated { get; set; }
    }
}