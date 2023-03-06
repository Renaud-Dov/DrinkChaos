

export const timeFormat = (last_refresh: Date, time: Date) => {
    const diff = Math.max((time.getTime() - last_refresh.getTime()) / 1000, 0)
    return `${Math.floor(diff % 60)}s ago`
}

