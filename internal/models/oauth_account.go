package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// OAuthAccount represents an OAuth account linked to a user
type OAuthAccount struct {
	ID             uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID         uuid.UUID  `gorm:"type:uuid;not null;index:idx_oauth_accounts_user_id;constraint:OnDelete:CASCADE" json:"user_id"`
	Provider       string     `gorm:"type:varchar(50);not null;uniqueIndex:idx_oauth_accounts_provider" json:"provider"`
	ProviderUserID string     `gorm:"type:varchar(255);not null;uniqueIndex:idx_oauth_accounts_provider" json:"provider_user_id"`
	AccessToken    *string    `gorm:"type:text" json:"-"`
	RefreshToken   *string    `gorm:"type:text" json:"-"`
	ExpiresAt      *time.Time `json:"expires_at"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	// Relationships
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// BeforeCreate hook to generate UUID
func (o *OAuthAccount) BeforeCreate(tx *gorm.DB) error {
	if o.ID == uuid.Nil {
		o.ID = uuid.New()
	}
	return nil
}

// TableName specifies the table name
func (OAuthAccount) TableName() string {
	return "oauth_accounts"
}
