import React from 'react'
import { ReactElement } from 'react'
import { ImageLabelling } from '../ImageLabelling/ImageLabelling'
import styles from './Dashboard.module.css'

export const Dashboard = (): ReactElement => {
  return (
    <div className={styles.dashboardContainer}>
      <ImageLabelling />
    </div>
  )
}
