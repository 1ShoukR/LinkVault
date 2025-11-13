package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// MagicLinkToken represents a magic link authentication token
type MagicLinkToken struct {
	ID        uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Email     string     `gorm:"type:varchar(255);not null;index:idx_magic_link_tokens_email_expires" json:"email"`
	Token     string     `gorm:"type:varchar(255);uniqueIndex;not null" json:"token"`
	ExpiresAt time.Time  `gorm:"not null;index:idx_magic_link_tokens_email_expires" json:"expires_at"`
	UsedAt    *time.Time `json:"used_at"`

	CreatedAt time.Time `json:"created_at"`
}

// BeforeCreate hook to generate UUID
func (m *MagicLinkToken) BeforeCreate(tx *gorm.DB) error {
	if m.ID == uuid.Nil {
		m.ID = uuid.New()
	}
	return nil
}

// TableName specifies the table name
func (MagicLinkToken) TableName() string {
	return "magic_link_tokens"
}

// IsExpired checks if the token has expired
func (m *MagicLinkToken) IsExpired() bool {
	return time.Now().After(m.ExpiresAt)
}

// IsUsed checks if the token has been used
func (m *MagicLinkToken) IsUsed() bool {
	return m.UsedAt != nil
}
