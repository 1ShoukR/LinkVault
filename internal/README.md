# LinkVault API

A Go/Gin backend API for LinkVault - an affiliate link management platform.

## Setup

1. Copy `.env.example` to `.env` and fill in your values
2. Install dependencies: `go mod download`
3. Run the server: `go run cmd/server/main.go`

## Development

```bash
# Run server
go run cmd/server/main.go

# Run tests
go test ./...

# Build binary
go build -o bin/server ./cmd/server/main.go
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api` - API info endpoint

## Environment Variables

See `.env.example` for all required environment variables.

