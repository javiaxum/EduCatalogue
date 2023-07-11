FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-env
WORKDIR /app
EXPOSE 8080

COPY "EduCatalogue.sln" "EduCatalogue.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"

RUN dotnet restore "EduCatalogue.sln"

COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out/ .
ENTRYPOINT [ "dotnet", "API.dll" ]