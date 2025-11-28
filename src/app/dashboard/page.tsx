"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Plus, X } from "lucide-react";

// Custom Modal Component - No external dependencies needed!
function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200 dark:bg-gray-900"
      >
        {children}
      </div>
    </div>
  );
}

// New Link Modal Component
function NewLinkModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Creating link:', formData);
    setIsSubmitting(false);
    onClose();
    // Reset form
    setFormData({ name: '', url: '', category: 'general' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Link
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add a new affiliate link to your dashboard
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form id="new-link-form" onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Link Name Input */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Link Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Amazon Echo Dot"
            />
          </div>

          {/* URL Input */}
          <div>
            <label 
              htmlFor="url" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Affiliate URL
            </label>
            <input
              id="url"
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="https://www.amazon.com/dp/..."
            />
          </div>

          {/* Category Select */}
          <div>
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="general">General</option>
              <option value="tech">Technology</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Garden</option>
              <option value="health">Health & Fitness</option>
            </select>
          </div>

          {/* Optional: Preview Card */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Preview
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formData.name || 'Link name will appear here'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
              {formData.url || 'URL will appear here'}
            </p>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="new-link-form"
              disabled={isSubmitting || !formData.name || !formData.url}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Main Dashboard Component
export default function DashboardPage() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.name || user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={logout} className="cursor-pointer">
              Sign Out
            </Button>
            <Button 
              className="cursor-pointer gap-2"
              onClick={() => setIsNewLinkModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New Link
            </Button>
          </div>
        </div>

        {/* Rest of your dashboard cards... */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Your existing cards */}
        </div>
      </div>

      {/* Modal */}
      <NewLinkModal 
        isOpen={isNewLinkModalOpen}
        onClose={() => setIsNewLinkModalOpen(false)}
      />
    </>
  );
}