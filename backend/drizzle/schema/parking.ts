import { interval, pgTable, point, time, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { timestamps } from '../utils/columns'
import {
    bootStatus,
    currency,
    day,
    enforcementType,
    licensePlate,
    location,
    money,
    paymentStatus,
    towStatus
} from '../utils/custom-types'

// Parking is a table that stores information about parking lots.
export const parking = pgTable('parking', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  code: varchar('code', { length: 6 }).notNull().unique(),
  location: point('location').notNull(),
  ...timestamps
})

// Fare is a table that stores information about parking fees.
export const fare = pgTable('fare', {
  id: uuid('id').primaryKey(),
  parkingId: uuid('parking_id')
    .references(() => parking.id)
    .notNull(),
  currency: currency('currency').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  minDuration: interval('min_duration').notNull().default('15 minutes'),
  maxDuration: interval('max_duration').notNull().default('2 hours'),
  ratePerMinute: money('rate_per_minute').notNull(),
  day: day('day').notNull(),
  description: varchar('description'),
  ...timestamps
})

// Payment is a table that stores information about payments made for parking fares.
export const payment = pgTable('payment', {
  id: uuid('id').primaryKey(),
  fareId: uuid('fare_id')
    .references(() => fare.id)
    .notNull(),
  externalId: varchar('external_id').notNull(),
  licensePlate: licensePlate('license_plate').notNull(),
  currency: currency('currency').notNull(),
  amount: money('amount').notNull(),
  status: paymentStatus('status').notNull().default('pending'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  ...timestamps
})

// Enforcement is a table that stores information about parking enforcement.
export const enforcement = pgTable('enforcement', {
  id: uuid('id').primaryKey(),
  parkingId: uuid('parking_id')
    .references(() => parking.id)
    .notNull(),
  type: enforcementType('type').notNull(),
  currency: currency('currency').notNull(),
  fixedFee: money('fixed-fee').notNull(),
  variableFee: money('variable-fee').notNull(),
  maxFee: money('max-fee').notNull(),
  ...timestamps
})

// Violation is a table that stores information about parking violations.
export const violation = pgTable('violation', {
  id: uuid('id').primaryKey(),
  enforcementId: uuid('enforcement_id')
    .references(() => enforcement.id)
    .notNull(),
  officerId: uuid('officer_id').notNull(),
  location: location('location').notNull(),
  licensePlate: licensePlate('license_plate').notNull(),
  image: varchar('image').notNull(),
  reason: varchar('reason', { length: 100 }).notNull(),
  settledAt: timestamp('settled_at'),
  ...timestamps
})

// Fine is a table that stores information about fines because of parking violations.
export const fine = pgTable('fine', {
  id: uuid('id').primaryKey(),
  violationId: uuid('violation_id')
    .references(() => violation.id)
    .notNull(),
  currency: currency('currency').notNull(),
  amount: money('amount').notNull(),
  status: paymentStatus('status').notNull().default('pending'),
  ...timestamps
})

// Boot is a table that stores information about boots placed on vehicles because of parking violations.
export const boot = pgTable('boot', {
  id: uuid('id').primaryKey(),
  violationId: uuid('violation_id')
    .references(() => violation.id)
    .notNull(),
  officerId: uuid('officer_id').notNull(),
  phone: varchar('phone', { length: 15 }).notNull(),
  deviceId: varchar('device_id', { length: 50 }).notNull(),
  status: bootStatus('status').notNull().default('locked'),
  ...timestamps
})

// Tow is a table that stores information about vehicles towed because of parking violations.
export const tow = pgTable('tow', {
  id: uuid('id').primaryKey(),
  violationId: uuid('violation_id')
    .references(() => violation.id)
    .notNull(),
  driverId: uuid('driver_id').notNull(),
  licensePlate: licensePlate('license_plate').notNull(),
  lotLocation: location('lot_location').notNull(),
  lotName: varchar('lot_name', { length: 50 }).notNull(),
  lotPhone: varchar('lot_phone', { length: 15 }).notNull(),
  status: towStatus('status').notNull().default('towed'),
  ...timestamps
})
