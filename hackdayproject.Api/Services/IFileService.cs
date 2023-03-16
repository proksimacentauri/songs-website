using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hackdayproject.Api.Services
{
    public interface IFileService
    {
        public Task<string> SaveImage(IFormFile imageFile);
        public Task<string> SaveAudio(IFormFile audioFile);
    }
}