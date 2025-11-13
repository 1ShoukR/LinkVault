package controllers

import (
	"net/http"
	"time"

	"github.com/1shoukr/linkvault/internal/services"
	"github.com/gin-gonic/gin"
)

// AuthController handles HTTP requests for authentication operations
type AuthController struct {
	authService *services.AuthService
}

// NewAuthController creates a new auth controller
func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

// Register handles user registration
func (ac *AuthController) Register(c *gin.Context) {
	var registerRequest struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
		Name     string `json:"name"`
	}

	if err := c.ShouldBindJSON(&registerRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, token, err := ac.authService.Register(registerRequest.Email, registerRequest.Password, registerRequest.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set HTTP-only cookie
	c.SetCookie(
		"token",
		token,
		int(24*time.Hour.Seconds()),
		"/",
		"",
		false, // Set to true in production with HTTPS
		true,  // HTTP-only
	)

	c.JSON(http.StatusCreated, gin.H{
		"message": "User registered successfully",
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
			"plan":  user.Plan,
		},
	})
}

// Login handles user login
func (ac *AuthController) Login(c *gin.Context) {
	var loginRequest struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, token, err := ac.authService.Login(loginRequest.Email, loginRequest.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// Set HTTP-only cookie
	c.SetCookie(
		"token",
		token,
		int(24*time.Hour.Seconds()),
		"/",
		"",
		false, // Set to true in production with HTTPS
		true,  // HTTP-only
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged in successfully",
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
			"plan":  user.Plan,
		},
	})
}

// Logout handles user logout
func (ac *AuthController) Logout(c *gin.Context) {
	// Clear the cookie
	c.SetCookie(
		"token",
		"",
		-1,
		"/",
		"",
		false,
		true,
	)

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

// ForgotPassword handles password reset request (placeholder)
func (ac *AuthController) ForgotPassword(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Forgot password functionality not yet implemented"})
}

// ResetPassword handles password reset (placeholder)
func (ac *AuthController) ResetPassword(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Reset password functionality not yet implemented"})
}
