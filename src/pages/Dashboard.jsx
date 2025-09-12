import React, { useMemo } from 'react'
import Card from '../components/Card'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts'

export default function Dashboard(){
  const focusData = useMemo(() => [
    { day: 'Mon', mins: 80 }, { day: 'Tue', mins: 50 }, { day: 'Wed', mins: 120 },
    { day: 'Thu', mins: 95 }, { day: 'Fri', mins: 60 }, { day: 'Sat', mins: 140 }, { day: 'Sun', mins: 105 }
  ], [])

  const streakData = useMemo(() => [
    { wk: 'W1', streak: 4 }, { wk: 'W2', streak: 6 }, { wk: 'W3', streak: 7 }, { wk: 'W4', streak: 5 }
  ], [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Deep Work (mins/day)" subtitle="Last 7 days">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={focusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mins" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Streak" subtitle="Weekly overview">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={streakData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="wk" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="streak" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  )
}
