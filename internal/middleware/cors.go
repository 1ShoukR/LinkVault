package middleware

import (
	"net/http"

	"github.com/1shoukr/linkvault/internal/config"
	"github.com/gin-gonic/gin"
)

// CORS middleware for handling cross-origin requests
func CORS(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		
		// Use configured CORS origin or allow the request origin
		allowedOrigin := cfg.CORSOrigin
		if origin != "" && cfg.Env == "development" {
			// In development, allow any origin
			allowedOrigin = origin
		}
		
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}



