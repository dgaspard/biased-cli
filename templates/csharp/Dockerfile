FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder

WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Production stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy build artifacts
COPY --from=builder /app/out .

# Expose port
EXPOSE 5000

# Run the application
ENTRYPOINT ["dotnet", "App.dll"]
