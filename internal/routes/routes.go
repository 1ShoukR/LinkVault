package routes

import (
	"github.com/1shoukr/linkvault/internal/controllers"
	"github.com/1shoukr/linkvault/internal/middleware"
	"github.com/1shoukr/linkvault/internal/repository"
	"github.com/1shoukr/linkvault/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	authRepo := repository.NewAuthRepository(db)

	// Initialize services
	userService := services.NewUserService(userRepo)
	authService := services.NewAuthService(authRepo)

	// Initialize controllers
	userController := controllers.NewUserController(userService)
	authController := controllers.NewAuthController(authService)

	// API routes
	api := router.Group("/api")
	{
		// Public auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/login", authController.Login)
			auth.POST("/register", authController.Register)
			auth.POST("/logout", authController.Logout)
			auth.POST("/forgot-password", authController.ForgotPassword)
			auth.POST("/reset-password", authController.ResetPassword)
		}

		// Protected routes (require authentication)
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware(authService))
		{
			// User routes (protected)
			users := protected.Group("/users")
			{
				users.GET("", userController.GetUsers)
				users.GET("/:id", userController.GetUser)
			}

			// Example: Get current user profile
			protected.GET("/me", func(c *gin.Context) {
				user, exists := c.Get("user")
				if !exists {
					c.JSON(401, gin.H{"error": "User not found in context"})
					return
				}
				c.JSON(200, gin.H{"user": user})
			})
		}
	}
}
