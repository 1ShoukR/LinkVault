package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Link represents an affiliate link
type Link struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID      uuid.UUID `gorm:"type:uuid;not null;index:idx_links_user_id;index:idx_links_user_status;constraint:OnDelete:CASCADE" json:"user_id"`
	OriginalURL string    `gorm:"type:text;not null" json:"original_url"`
	Title       *string   `gorm:"type:varchar(500)" json:"title"`
	Description *string   `gorm:"type:text" json:"description"`

	// Organization (Pro feature)
	Category *string  `gorm:"type:varchar(100)" json:"category"`
	Platform *string  `gorm:"type:varchar(100)" json:"platform"`
	Tags     []string `gorm:"type:text[]" json:"tags"`

	// Status tracking
	Status           string     `gorm:"type:varchar(20);default:'active';index:idx_links_status;index:idx_links_user_status" json:"status"`
	IsHealthy        bool       `gorm:"default:true;index:idx_links_is_healthy" json:"is_healthy"`
	LastStatusCode   *int       `json:"last_status_code"`
	LastResponseTime *int       `json:"last_response_time"`
	LastCheckedAt    *time.Time `gorm:"index:idx_links_last_checked" json:"last_checked_at"`
	LastWorkingAt    *time.Time `json:"last_working_at"`

	// Analytics (Pro feature)
	ClickCount int `gorm:"default:0" json:"click_count"`

	// Metadata
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
	ArchivedAt *time.Time `json:"archived_at"`

	// Relationships
	User         User               `gorm:"foreignKey:UserID" json:"-"`
	Clicks       []Click            `gorm:"foreignKey:LinkID;constraint:OnDelete:CASCADE" json:"-"`
	CheckHistory []LinkCheckHistory `gorm:"foreignKey:LinkID;constraint:OnDelete:CASCADE" json:"-"`
}

// BeforeCreate hook to generate UUID
func (l *Link) BeforeCreate(tx *gorm.DB) error {
	if l.ID == uuid.Nil {
		l.ID = uuid.New()
	}
	return nil
}

// TableName specifies the table name
func (Link) TableName() string {
	return "links"
}
