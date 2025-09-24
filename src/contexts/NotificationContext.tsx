import React, { createContext, useContext, useState } from 'react'

interface Notification {
  id: string
  type: 'approved' | 'rejected' | 'pending' | 'info'
  title: string
  description: string
  timestamp: string
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'approved',
      title: 'Access approved',
      description: 'Client P&L access approved.',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'approved', 
      title: 'LM approved',
      description: 'Your request for Client P&L access has been approved by LM. Awaiting next steps.',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'rejected',
      title: 'Access rejected',
      description: 'Finance Report request denied by RLS.',
      timestamp: '1 hour ago',
      read: true
    },
    {
      id: '4',
      type: 'pending',
      title: 'Approval pending',
      description: 'Marketing Analytics access is awaiting OLS approval.',
      timestamp: '2 hours ago',
      read: false
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: 'Just now',
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
