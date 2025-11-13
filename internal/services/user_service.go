package services

import (
	"errors"

	"github.com/1shoukr/linkvault/internal/models"
	"github.com/1shoukr/linkvault/internal/repository"
	"github.com/google/uuid"
)

// UserService handles business logic for users
type UserService struct {
	userRepo *repository.UserRepository
}

// NewUserService creates a new user service
func NewUserService(userRepo *repository.UserRepository) *UserService {
	return &UserService{
		userRepo: userRepo,
	}
}

// GetUserByID retrieves a user by their ID
func (s *UserService) GetUserByID(id uuid.UUID) (*models.User, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid user ID")
	}

	user, err := s.userRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetUserByEmail retrieves a user by their email
func (s *UserService) GetUserByEmail(email string) (*models.User, error) {
	if email == "" {
		return nil, errors.New("email is required")
	}

	user, err := s.userRepo.GetByEmail(email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetAllUsers retrieves all users
func (s *UserService) GetAllUsers() ([]models.User, error) {
	users, err := s.userRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return users, nil
}
