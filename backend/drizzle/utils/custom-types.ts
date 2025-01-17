import { customType } from 'drizzle-orm/pg-core'

type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled' | 'expired'

export const paymentStatus = customType<{ data: PaymentStatus }>({
  dataType: () => 'varchar(20)'
})

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | 'holiday' | 'custom'

export const day = customType<{ data: Day }>({
  dataType: () => 'varchar(20)'
})

type EnforcementType = 'ticket' | 'booting' | 'towing'

export const enforcementType = customType<{ data: EnforcementType }>({
  dataType: () => 'varchar(10)'
})

type Currency = 'USD' | 'CLP'

export const currency = customType<{ data: Currency }>({
  dataType: () => 'varchar(3)'
})

export const money = customType<{ data: number }>({
  dataType: () => 'numeric(10,3)'
})

export const licensePlate = customType<{ data: string }>({
  dataType: () => 'varchar(10)'
})

export const location = customType<{ data: { x: number; y: number } }>({
  dataType: () => 'point'
})

type BootStatus = 'locked' | 'paid' | 'unlocked'

export const bootStatus = customType<{ data: BootStatus }>({
  dataType: () => 'varchar(10)'
})

type TowStatus = 'towed' | 'paid' | 'released'

export const towStatus = customType<{ data: TowStatus }>({
  dataType: () => 'varchar(10)'
})
