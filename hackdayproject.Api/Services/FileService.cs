using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hackdayproject.Api.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public FileService(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            var imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        public async Task<string> SaveAudio(IFormFile audioFile)
        {
            var audioName = new String(Path.GetFileNameWithoutExtension(audioFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            audioName = audioName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(audioFile.FileName);
            var audioPath = Path.Combine(_hostEnvironment.ContentRootPath, "Audios", audioName);
            using (var fileStream = new FileStream(audioPath, FileMode.Create))
            {
                await audioFile.CopyToAsync(fileStream);
            }
            return audioName;
        }
    }
}