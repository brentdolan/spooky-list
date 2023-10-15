'use client'
import React, { type MouseEventHandler, type ReactNode } from 'react'
import styles from './SecondaryNav.module.scss'

interface SecondaryNavProps {
  initialTabName: string
  tabs: Array<{
    title: string
    component: ReactNode
  }>
}

export const SecondaryNav: React.FC<SecondaryNavProps> = ({ initialTabName, tabs }) => {
  const [currentTabName, setCurrentTabName] = React.useState(initialTabName)
  const currentTab = tabs.find(tab => tab.title === currentTabName)

  const switchTabs: MouseEventHandler<HTMLDivElement> = (e) => {
    setCurrentTabName(e.target.innerHTML)
  }

  return (
      <div className={styles.secondaryNav}>
          <div className={styles.links}>
              {tabs.map(tab => (
                  <div key={tab.title} className={`${styles.navLink} ${(tab.title === currentTabName) ? styles.active : ''}`} onClick={switchTabs}>{tab.title}</div>
              ))}
          </div>
          <div className={styles.content}>
              <h1 className={styles.header}>{currentTab?.title}</h1>
              {currentTab?.component}
          </div>
      </div>
  )
}
