using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hackdayproject.Api;
using hackdayproject.Api.Services;

namespace hackdayproject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly dbContext _context;
        private readonly IFileService _fileservice;

        public SongsController(dbContext context, IFileService fileService)
        {
            _context = context;
            _fileservice = fileService;
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetSong(string searchParameter = "")
        {
            var songQuery = _context.Song.Select(song => song);
            if (!String.IsNullOrEmpty(searchParameter))
            {
                songQuery = songQuery.Where(song => song.Name.Contains(searchParameter));
            }
            return await songQuery.ToListAsync();
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(Guid id)
        {
            var song = await _context.Song.FindAsync(id);

            if (song == null)
            {
                return NotFound();
            }

            return song;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong(Guid id, [FromForm]UpdateSongRequest songRequest)
        {
            var existingSong = await _context.Song.FindAsync(id);
            var picturePath =  await _fileservice.SaveImage(songRequest.Picture);
            var songPath = await _fileservice.SaveAudio(songRequest.Audio);

            if (existingSong != null)
            {
                existingSong.Name = songRequest.Name;
                existingSong.ArtistName = songRequest.ArtistName;
                existingSong.Audio = songPath;
                existingSong.Picture = picturePath;

                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }
            return Ok(existingSong);
        }
        
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong([FromForm]AddSongRequest songRequest)
        {
            var picturePath =  await _fileservice.SaveImage(songRequest.Picture);
            var songPath = await _fileservice.SaveAudio(songRequest.Audio);
            var song = new Song {
                Name = songRequest.Name,
                ArtistName = songRequest.ArtistName,
                Audio = songPath,
                Picture = picturePath,
            };
            _context.Song.Add(song);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(Guid id)
        {
            var song = await _context.Song.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _context.Song.Remove(song);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SongExists(Guid id)
        {
            return _context.Song.Any(e => e.Id == id);
        }

    }
}
