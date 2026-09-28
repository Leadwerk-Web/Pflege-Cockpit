export const benefits = {
  0: { cash: 0, inKind: 0, dayCare: 0, relief: 0, tools: 0 },
  1: { cash: 0, inKind: 0, dayCare: 0, relief: 131, tools: 42 },
  2: { cash: 347, inKind: 796, dayCare: 721, relief: 131, tools: 42 },
  3: { cash: 599, inKind: 1497, dayCare: 1357, relief: 131, tools: 42 },
  4: { cash: 800, inKind: 1859, dayCare: 1685, relief: 131, tools: 42 },
  5: { cash: 990, inKind: 2299, dayCare: 2085, relief: 131, tools: 42 },
}

const intervals = {
  m1: [[0, 1, 0], [2, 3, 2.5], [4, 5, 5], [6, 9, 7.5], [10, 15, 10]],
  m2: [[0, 1, 0], [2, 5, 3.75], [6, 10, 7.5], [11, 16, 11.25], [17, 33, 15]],
  m3: [[0, 0, 0], [1, 2, 3.75], [3, 4, 7.5], [5, 6, 11.25], [7, 65, 15]],
  m4: [[0, 2, 0], [3, 7, 10], [8, 18, 20], [19, 36, 30], [37, 54, 40]],
  m5: [[0, 0, 0], [1, 1, 5], [2, 3, 10], [4, 5, 15], [6, 15, 20]],
  m6: [[0, 0, 0], [1, 3, 3.75], [4, 6, 7.5], [7, 11, 11.25], [12, 18, 15]],
}

export function weighted(module, raw) {
  return intervals[module].find(([from, to]) => raw >= from && raw <= to)?.[2] ?? 0
}

export function careDegreeFromPoints(points, child = false, special = false) {
  if (special) return 5
  if (points < 12.5) return 0
  if (child) return points < 27 ? 2 : points < 47.5 ? 3 : points < 70 ? 4 : 5
  return points < 27 ? 1 : points < 47.5 ? 2 : points < 70 ? 3 : points < 90 ? 4 : 5
}

export function module5Points(values = []) {
  const normalized = values.slice(0, 16).map((row = {}, index) => {
    const daily = Number(row.daily || 0)
    const weekly = Number(row.weekly || 0)
    const monthly = Number(row.monthly || 0)
    if (index <= 10) return daily + weekly / 7 + monthly / 30
    if (index === 11) return (daily >= 1 ? 60 : 0) + weekly * 2 * 4.3 + monthly * 2
    if (index === 14) return weekly * 2 * 4.3 + monthly * 2
    return weekly * 4.3 + monthly
  })
  const first = normalized.slice(0, 7).reduce((a, b) => a + b, 0)
  const second = normalized.slice(7, 11).reduce((a, b) => a + b, 0)
  const third = normalized.slice(11, 16).reduce((a, b) => a + b, 0)
  const p1 = first < 1 ? 0 : first <= 3 ? 1 : first <= 8 ? 2 : 3
  const p2 = second < 1 / 7 ? 0 : second < 1 ? 1 : second < 3 ? 2 : 3
  const p3 = third < 4.3 ? 0 : third < 8.6 ? 1 : third < 12.9 ? 2 : third < 60 ? 3 : 6
  return p1 + p2 + p3 + Number(values[16]?.points || 0)
}

export function calculateAssessment(answers, special = false, isChild = false) {
  const raw = {
    m1: sum(answers.m1),
    m2: sum(answers.m2),
    m3: sum(answers.m3),
    m4: sum(answers.m4),
    m5: module5Points(answers.m5),
    m6: sum(answers.m6),
  }
  const scores = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, weighted(key, value)]))
  const total = special ? 100 : scores.m1 + Math.max(scores.m2, scores.m3) + scores.m4 + scores.m5 + scores.m6
  return { raw, scores, total, degree: careDegreeFromPoints(total, isChild, special) }
}

export function combination(careDegree, inKind = 0, conversion = 0) {
  const rule = benefits[careDegree] || benefits[0]
  const consumed = Math.min(rule.inKind, Math.max(0, Number(inKind)) + Math.max(0, Number(conversion)))
  const ratio = rule.inKind ? consumed / rule.inKind : 0
  return {
    cash: round(rule.cash * (1 - ratio)),
    ownCost: round(Math.max(0, Number(inKind) + Number(conversion) - rule.inKind)),
    conversionMax: round(rule.inKind * 0.4),
    ratio: round(ratio * 100),
  }
}

export function respiteCalculation({ degree, relation, fee, travel, incomeLoss, sharedSpent, days, hourly }) {
  const rule = benefits[degree] || benefits[0]
  const available = Math.max(0, 3539 - Number(sharedSpent || 0))
  const cappedFee = relation === 'near' ? Math.min(Number(fee || 0), rule.cash * 2) : Number(fee || 0)
  const eligible = Math.max(0, cappedFee + Number(travel || 0) + Number(incomeLoss || 0))
  const reimbursed = round(Math.min(available, eligible))
  const reductionDays = hourly ? 0 : Math.max(0, Math.min(56, Number(days || 0)) - 2)
  return {
    available: round(available), eligible: round(eligible), reimbursed,
    ownCost: round(Math.max(0, Number(fee || 0) + Number(travel || 0) + Number(incomeLoss || 0) - reimbursed)),
    remaining: round(available - reimbursed), reductionDays,
    cashReduction: round((rule.cash / 30) * 0.5 * reductionDays),
  }
}

function sum(values = []) { return values.reduce((total, value) => total + Number(value || 0), 0) }
export function round(value) { return Math.round((Number(value) + Number.EPSILON) * 100) / 100 }
export function euro(value) { return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value || 0) }
