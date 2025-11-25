var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

Console.WriteLine("🚀 {{PROJECT_NAME}} running on http://localhost:5000");
Console.WriteLine("📋 Problem: {{PROJECT_PROBLEM}}");
Console.WriteLine("👥 Personas: {{USER_PERSONAS}}");

app.Run();
