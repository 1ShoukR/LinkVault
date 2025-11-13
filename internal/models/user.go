package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Email     string    `gorm:"type:varchar(255);uniqueIndex;not null" json:"email"`
	PasswordHash *string `gorm:"type:varchar(255)" json:"-"` // Hidden from JSON
	Name      *string   `gorm:"type:varchar(255)" json:"name"`
	AvatarURL *string   `gorm:"type:text" json:"avatar_url"`
	EmailVerified bool   `gorm:"default:false" json:"email_verified"`
	
	// Subscription info
	Plan                string     `gorm:"type:varchar(20);default:'free'" json:"plan"`
	StripeCustomerID    *string    `gorm:"type:varchar(255)" json:"-"`
	SubscriptionStatus  *string    `gorm:"type:varchar(20)" json:"subscription_status"`
	SubscriptionID      *string    `gorm:"type:varchar(255)" json:"-"`
	TrialEndsAt         *time.Time `json:"trial_ends_at"`
	CurrentPeriodEnd    *time.Time `json:"current_period_end"`
	
	// Timestamps
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	LastLoginAt *time.Time `json:"last_login_at"`
	
	// Relationships
	OAuthAccounts []OAuthAccount `gorm:"foreignKey:UserID" json:"-"`
	Links         []Link         `gorm:"foreignKey:UserID" json:"-"`
}

// BeforeCreate hook to generate UUID
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

// TableName specifies the table name
func (User) TableName() string {
	return "users"
}

