//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using MySql.Data.MySqlClient;
//using OnlineStoreBackend.Models.DB;



//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Add configuration
//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//                    .AddEnvironmentVariables();

//// Configure connection string
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//// Register VehicleItemBusiness with the connection string
//builder.Services.AddScoped<VehicleItemBusiness>(provider =>
//    new VehicleItemBusiness(connectionString));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();
//app.Run();


//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using MySql.Data.MySqlClient;
//using OnlineStoreBackend.Models.DB;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Add CORS configuration to allow all origins
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        policy =>
//        {
//            policy.AllowAnyOrigin()
//                  .AllowAnyHeader()
//                  .AllowAnyMethod();
//        });
//});

//// Add configuration
//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//                    .AddEnvironmentVariables();

//// Configure connection string
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//// Register VehicleItemBusiness with the connection string
//builder.Services.AddScoped<VehicleItemBusiness>(provider =>
//    new VehicleItemBusiness(connectionString));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//// Enable CORS - Add this before other middleware
//app.UseCors("AllowAll");

//app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();

//app.Run();





//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using MySql.Data.MySqlClient;
//using OnlineStoreBackend.Models.DB;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Add CORS configuration
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactApp",
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:3000")
//                  .AllowAnyHeader()
//                  .AllowAnyMethod();
//        });
//});

//// Add configuration
//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//                    .AddEnvironmentVariables();

//// Configure connection string
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//// Register VehicleItemBusiness with the connection string
//builder.Services.AddScoped<VehicleItemBusiness>(provider =>
//    new VehicleItemBusiness(connectionString));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//// Enable CORS - Add this before other middleware
//app.UseCors("AllowReactApp");

//app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();

//app.Run();




//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using MySql.Data.MySqlClient;
//using OnlineStoreBackend.Models.DB;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Add CORS configuration
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactApp",
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:3000")
//                  .AllowAnyHeader()
//                  .AllowAnyMethod();
//        });
//});

//// Add configuration
//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//                    .AddEnvironmentVariables();

//// Configure connection string
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//// Register VehicleItemBusiness with the connection string
//builder.Services.AddScoped<VehicleItemBusiness>(provider =>
//    new VehicleItemBusiness(connectionString));

//// Register UserAuthanticationData with the connection string
//builder.Services.AddScoped<UserAuthenticationData>(provider =>
//    new UserAuthenticationData(connectionString));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//// Enable CORS - Add this before other middleware
//app.UseCors("AllowReactApp");

//app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();

//app.Run();



using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
// Replace MySql import with System.Data.SqlClient
using System.Data.SqlClient;
using OnlineStoreBackend.Models.DB;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("https://speedway-onlinestore.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add configuration
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .AddEnvironmentVariables();

// Configure connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register VehicleItemBusiness with the connection string
builder.Services.AddScoped<VehicleItemBusiness>(provider =>
    new VehicleItemBusiness(connectionString));

// Register UserAuthenticationData with the corrected class name
builder.Services.AddScoped<UserAuthanticationData>(provider =>
    new UserAuthanticationData(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS - Add this before other middleware
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();