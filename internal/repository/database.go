package repository

import (
	"fmt"
	"log"

	"github.com/1shoukr/linkvault/internal/config"
	"github.com/1shoukr/linkvault/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// InitDatabase initializes the database connection and runs AutoMigrate
func InitDatabase(cfg *config.Config) (*gorm.DB, error) {
	if cfg.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	// Configure GORM logger based on environment
	var gormLogger logger.Interface
	if cfg.Env == "production" {
		gormLogger = logger.Default.LogMode(logger.Silent)
	} else {
		gormLogger = logger.Default.LogMode(logger.Info)
	}

	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{
		Logger: gormLogger,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Test the connection
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database instance: %w", err)
	}

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Set connection pool settings
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	// AutoMigrate all models
	log.Println("Running database migrations...")
	err = db.AutoMigrate(
		&models.User{},
		&models.OAuthAccount{},
		&models.MagicLinkToken{},
		&models.Link{},
		&models.Click{},
		&models.LinkCheckHistory{},
		&models.Subscription{},
	)
	if err != nil {
		return nil, fmt.Errorf("failed to run migrations: %w", err)
	}

	DB = db
	log.Println("Database connection established and migrations completed successfully")
	return db, nil
}

// GetDB returns the database instance
func GetDB() *gorm.DB {
	return DB
}
