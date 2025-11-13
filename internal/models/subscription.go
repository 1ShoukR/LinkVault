package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Subscription represents a Stripe subscription
type Subscription struct {
	ID                   uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID               uuid.UUID  `gorm:"type:uuid;not null;index;constraint:OnDelete:CASCADE" json:"user_id"`
	StripeSubscriptionID string     `gorm:"type:varchar(255);uniqueIndex;not null" json:"stripe_subscription_id"`
	StripeCustomerID     string     `gorm:"type:varchar(255);not null" json:"stripe_customer_id"`
	Status               string     `gorm:"type:varchar(20);not null;index" json:"status"` // 'active', 'canceled', 'past_due', 'trialing'
	Plan                 string     `gorm:"type:varchar(20);not null" json:"plan"`         // 'pro'
	CurrentPeriodStart   time.Time  `gorm:"not null" json:"current_period_start"`
	CurrentPeriodEnd     time.Time  `gorm:"not null" json:"current_period_end"`
	CancelAtPeriodEnd    bool       `gorm:"default:false" json:"cancel_at_period_end"`
	CanceledAt           *time.Time `json:"canceled_at"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	// Relationships
	User User `gorm:"foreignKey:UserID" json:"-"`
}

// BeforeCreate hook to generate UUID
func (s *Subscription) BeforeCreate(tx *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

// TableName specifies the table name
func (Subscription) TableName() string {
	return "subscriptions"
}
