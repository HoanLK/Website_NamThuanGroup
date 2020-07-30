using System.IO;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class FileUploadController : Controller
    {
        public ActionResult UploadMultipleFile()
        {
            return View();
        }

        [HttpPost]
        public virtual string UploadFiles(object obj)
        {

            var length = Request.ContentLength;
            var bytes = new byte[length];
            Request.InputStream.Read(bytes, 0, length);

            var fileName = Request.Headers["X-File-Name"];
            var fileSize = Request.Headers["X-File-Size"];
            var fileType = Request.Headers["X-File-Type"];

            var saveToFileLoc = "D:\\Images\\" + fileName;
            var fileStream = new FileStream(saveToFileLoc, FileMode.Create, FileAccess.ReadWrite);
            fileStream.Write(bytes, 0, length);
            fileStream.Close();

            return string.Format("{0} bytes uploaded", bytes.Length);
        }
    }
}