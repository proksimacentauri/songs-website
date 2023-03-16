using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hackdayproject.Api
{
  public class Song 
  { 
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; } 
    public required string Name { get; set; }
    public required string ArtistName { get; set; }
    public required string Audio { get; set; }
    public required string Picture { get; set; }
  }
}