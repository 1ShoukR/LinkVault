package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Click represents a click on an affiliate link (Pro feature)
type Click struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	LinkID    uuid.UUID `gorm:"type:uuid;not null;index:idx_clicks_link_id;index:idx_clicks_link_date" json:"link_id"`
	ClickedAt time.Time `gorm:"default:now();index:idx_clicks_clicked_at;index:idx_clicks_link_date" json:"clicked_at"`
	Referrer  *string   `gorm:"type:text" json:"referrer"`
	UserAgent *string   `gorm:"type:text" json:"user_agent"`
	IPAddress *string   `gorm:"type:varchar(45)" json:"ip_address"` // IPv6 compatible
	Country   *string   `gorm:"type:varchar(2)" json:"country"`     // ISO country code

	// Relationships
	Link Link `gorm:"foreignKey:LinkID" json:"-"`
}

// BeforeCreate hook to generate UUID
func (c *Click) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	if c.ClickedAt.IsZero() {
		c.ClickedAt = time.Now()
	}
	return nil
}

// TableName specifies the table name
func (Click) TableName() string {
	return "clicks"
}
