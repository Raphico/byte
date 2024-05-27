import {
  addMonths,
  addWeeks,
  differenceInMonths,
  endOfWeek,
  format,
  isSameMonth,
  isThisWeek,
  isToday,
  isTomorrow,
  isWithinInterval,
  startOfWeek,
} from "date-fns"

export function formatScheduledDate(scheduled: Date) {
  const now = new Date()

  switch (true) {
    case isToday(scheduled):
      return format(scheduled, "HH:mm")

    case isTomorrow(scheduled):
      return "Tomorrow"

    case isThisWeek(scheduled, { weekStartsOn: 1 }):
      return format(scheduled, "EEEE") // Day of the week

    case isNextWeek(scheduled):
      return "Next Week"

    case isSameMonth(addMonths(now, 1), scheduled):
      return "Next Month"

    default:
      const monthDifference = differenceInMonths(scheduled, now)
      if (monthDifference >= 2) {
        return `In ${monthDifference} months`
      } else {
        return format(scheduled, "dd MMM yyyy")
      }
  }
}

function isNextWeek(date: Date) {
  const now = new Date()
  const startOfNextWeek = startOfWeek(addWeeks(now, 1), { weekStartsOn: 0 })
  const endOfNextWeek = endOfWeek(startOfNextWeek, { weekStartsOn: 0 })

  return isWithinInterval(date, { start: startOfNextWeek, end: endOfNextWeek })
}
