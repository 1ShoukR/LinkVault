package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// LinkCheckHistory represents the history of link health checks (Pro feature)
type LinkCheckHistory struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	LinkID       uuid.UUID `gorm:"type:uuid;not null;index:idx_link_check_history_link_id;index:idx_link_check_history_link_date" json:"link_id"`
	CheckedAt    time.Time `gorm:"default:now();index:idx_link_check_history_checked_at;index:idx_link_check_history_link_date" json:"checked_at"`
	StatusCode   int       `gorm:"not null" json:"status_code"`
	ResponseTime *int      `json:"response_time"` // milliseconds
	IsHealthy    bool      `gorm:"not null" json:"is_healthy"`
	ErrorMessage *string   `gorm:"type:text" json:"error_message"`

	// Relationships
	Link Link `gorm:"foreignKey:LinkID" json:"-"`
}

// BeforeCreate hook to generate UUID
func (l *LinkCheckHistory) BeforeCreate(tx *gorm.DB) error {
	if l.ID == uuid.Nil {
		l.ID = uuid.New()
	}
	if l.CheckedAt.IsZero() {
		l.CheckedAt = time.Now()
	}
	return nil
}

// TableName specifies the table name
func (LinkCheckHistory) TableName() string {
	return "link_check_history"
}
