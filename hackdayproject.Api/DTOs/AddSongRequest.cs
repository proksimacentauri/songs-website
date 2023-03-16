using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hackdayproject.Api
{
  public class AddSongRequest 
  { 
    public required string Name { get; set; }
    public required string ArtistName { get; set; }
    public required IFormFile Audio { get; set; }
    public required IFormFile Picture { get; set; }
  }
}