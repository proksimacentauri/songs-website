using hackdayproject.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IFileService, FileService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<dbContext>(options =>
    options.UseSqlServer(builder.Configuration["sadconnectionstring"] ?? throw new InvalidOperationException("Connection string 'dbContext' not found.")));
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(cors =>
    {
        cors.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
}

if (app.Environment.IsProduction())
{
    builder.Services.AddDbContext<dbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("SQLAZURECONNSTR_sadconnectionstring")));
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Images")),
    RequestPath = "/Images"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Audios")),
    RequestPath = "/Audios"
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
