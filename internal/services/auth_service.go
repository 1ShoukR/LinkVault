package services

import (
	"errors"
	"time"

	"github.com/1shoukr/linkvault/internal/models"
	"github.com/1shoukr/linkvault/internal/repository"
	"github.com/1shoukr/linkvault/pkg/utils"
	"github.com/google/uuid"
)

// AuthService handles business logic for authentication operations
type AuthService struct {
	authRepo *repository.AuthRepository
}

// NewAuthService creates a new auth service
func NewAuthService(authRepo *repository.AuthRepository) *AuthService {
	return &AuthService{
		authRepo: authRepo,
	}
}

// Register registers a new user
func (s *AuthService) Register(email, password, name string) (*models.User, string, error) {
	// Check if user already exists
	existingUser, _ := s.authRepo.GetUserByEmail(email)
	if existingUser != nil {
		return nil, "", errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return nil, "", errors.New("failed to hash password")
	}

	// Create user
	user := &models.User{
		Email:         email,
		PasswordHash:  &hashedPassword,
		Name:          &name,
		Plan:          "free",
		EmailVerified: false,
	}

	if err := s.authRepo.CreateUser(user); err != nil {
		return nil, "", errors.New("failed to create user")
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, "", errors.New("failed to generate token")
	}

	// Update last login
	now := time.Now()
	user.LastLoginAt = &now
	s.authRepo.UpdateUser(user)

	return user, token, nil
}

// Login logs in a user
func (s *AuthService) Login(email string, password string) (*models.User, string, error) {
	user, err := s.authRepo.GetUserByEmail(email)
	if err != nil {
		return nil, "", errors.New("invalid email or password")
	}

	// Check if user has a password (OAuth-only users won't have one)
	if user.PasswordHash == nil {
		return nil, "", errors.New("invalid email or password")
	}

	// Verify password
	if !utils.CheckPasswordHash(password, *user.PasswordHash) {
		return nil, "", errors.New("invalid email or password")
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, "", errors.New("failed to generate token")
	}

	// Update last login
	now := time.Now()
	user.LastLoginAt = &now
	s.authRepo.UpdateUser(user)

	return user, token, nil
}

// GetUserByID retrieves a user by ID
func (s *AuthService) GetUserByID(id uuid.UUID) (*models.User, error) {
	return s.authRepo.GetUserByID(id)
}
