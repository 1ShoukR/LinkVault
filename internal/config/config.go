package config

import (
	"os"
)

type Config struct {
	// Server
	Port string
	Env  string

	// Database
	DatabaseURL string

	// JWT
	JWTSecret string

	// OAuth
	GoogleClientID     string
	GoogleClientSecret string
	GoogleCallbackURL  string

	// Email
	ResendAPIKey string

	// Stripe
	StripeSecretKey    string
	StripeWebhookSecret string
	StripeProPriceID   string

	// CORS
	CORSOrigin  string
	FrontendURL string

	// Cron
	CronSecret string
}

func Load() *Config {
	return &Config{
		Port:               getEnv("PORT", "8080"),
		Env:                getEnv("ENV", "development"),
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		JWTSecret:          getEnv("JWT_SECRET", ""),
		GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
		GoogleCallbackURL:  getEnv("GOOGLE_CALLBACK_URL", ""),
		ResendAPIKey:       getEnv("RESEND_API_KEY", ""),
		StripeSecretKey:    getEnv("STRIPE_SECRET_KEY", ""),
		StripeWebhookSecret: getEnv("STRIPE_WEBHOOK_SECRET", ""),
		StripeProPriceID:   getEnv("STRIPE_PRO_PRICE_ID", ""),
		CORSOrigin:         getEnv("CORS_ORIGIN", "http://localhost:3000"),
		FrontendURL:        getEnv("FRONTEND_URL", "http://localhost:3000"),
		CronSecret:         getEnv("CRON_SECRET", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}



