package main

import (
	"log"

	"github.com/1shoukr/linkvault/internal/api/middleware"
	"github.com/1shoukr/linkvault/internal/config"
	"github.com/1shoukr/linkvault/internal/repository"
	"github.com/1shoukr/linkvault/internal/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load configuration
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Failed to load environment variables: %v", err)
	}
	cfg := config.Load()

	// Initialize database connection
	db, err := repository.InitDatabase(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer func() {
		sqlDB, _ := db.DB()
		if sqlDB != nil {
			sqlDB.Close()
		}
	}()

	// Set Gin mode based on environment
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	
	// Initialize Gin router
	router := gin.Default()
	// Setup CORS middleware
	router.Use(middleware.CORS(cfg))
	// Setup routes
	routes.SetupRoutes(router, db)

	log.Printf("Server starting on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
