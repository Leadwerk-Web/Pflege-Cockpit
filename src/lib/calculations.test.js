import { describe, expect, it } from 'vitest'
import { benefits, calculateAssessment, careDegreeFromPoints, combination, module5Points, respiteCalculation, weighted } from './calculations'

describe('care degree calculation', () => {
  it('uses statutory thresholds', () => {
    expect(careDegreeFromPoints(12.49)).toBe(0)
    expect(careDegreeFromPoints(12.5)).toBe(1)
    expect(careDegreeFromPoints(27)).toBe(2)
    expect(careDegreeFromPoints(47.5)).toBe(3)
    expect(careDegreeFromPoints(70)).toBe(4)
    expect(careDegreeFromPoints(90)).toBe(5)
  })
  it('uses the higher score of modules two and three', () => {
    const result = calculateAssessment({ m1:[2], m2:[11], m3:[3], m4:[3], m5:Array(17).fill({}), m6:[1] })
    expect(result.total).toBe(27.5)
    expect(result.degree).toBe(2)
  })
  it('assigns special need to degree five', () => {
    expect(careDegreeFromPoints(0, false, true)).toBe(5)
  })
  it('raises the care degree for children under 18 months', () => {
    expect(careDegreeFromPoints(12.5, true)).toBe(2)
    expect(careDegreeFromPoints(27, true)).toBe(3)
    expect(careDegreeFromPoints(47.5, true)).toBe(4)
    expect(careDegreeFromPoints(70, true)).toBe(5)
  })
  it('maps module intervals', () => {
    expect(weighted('m1', 2)).toBe(2.5)
    expect(weighted('m4', 37)).toBe(40)
    expect(weighted('m2', 33)).toBe(15)
    expect(weighted('m3', 65)).toBe(15)
  })
  it('normalizes therapy frequencies into module five points', () => {
    const daily = Array.from({ length: 17 }, () => ({}))
    daily[0] = { daily: 1 }
    expect(module5Points(daily)).toBe(1)

    const weekly = Array.from({ length: 17 }, () => ({}))
    weekly[7] = { weekly: 1 }
    expect(module5Points(weekly)).toBe(1)
  })
  it('reaches one hundred points at adult maximum', () => {
    const therapy = Array.from({ length: 17 }, () => ({ daily: 10, weekly: 10, monthly: 10, points: 3 }))
    const result = calculateAssessment({ m1:[15], m2:[33], m3:[65], m4:[54], m5:therapy, m6:[18] })
    expect(result.total).toBe(100)
    expect(result.degree).toBe(5)
  })
})

describe('benefit calculation', () => {
  it('calculates fifty percent combination benefit', () => {
    expect(combination(2, 398, 0).cash).toBe(173.5)
  })
  it('exposes the official 2025/2026 monthly amounts', () => {
    expect(benefits[2]).toMatchObject({ cash:347, inKind:796, dayCare:721, relief:131, tools:42 })
    expect(benefits[5]).toMatchObject({ cash:990, inKind:2299, dayCare:2085, relief:131, tools:42 })
  })
  it('limits conversion to forty percent of in-kind benefit', () => {
    expect(combination(4, 0, 743.6)).toMatchObject({ cash:480, conversionMax:743.6, ratio:40 })
  })
  it('caps benefit use and reports private costs', () => {
    expect(combination(2, 900, 0)).toMatchObject({ cash:0, ownCost:104 })
  })
  it('uses the shared annual respite budget', () => {
    expect(respiteCalculation({ degree:3, relation:'other', fee:2000, travel:0, incomeLoss:0, sharedSpent:1700, days:7, hourly:false })).toMatchObject({ reimbursed:1839, ownCost:161, remaining:0, reductionDays:5 })
  })
  it('caps compensation for a close relative at twice the cash benefit', () => {
    expect(respiteCalculation({ degree:2, relation:'near', fee:1000, travel:100, incomeLoss:0, sharedSpent:0, days:1, hourly:false })).toMatchObject({ eligible:794, reimbursed:794 })
  })
  it('does not reduce cash benefit for hourly respite care', () => {
    expect(respiteCalculation({ degree:2, relation:'other', fee:200, travel:0, incomeLoss:0, sharedSpent:0, days:7, hourly:true })).toMatchObject({ reductionDays:0, cashReduction:0 })
  })
  it('subtracts the first and last day from cash reduction', () => {
    expect(respiteCalculation({ degree:2, relation:'other', fee:200, travel:0, incomeLoss:0, sharedSpent:0, days:7, hourly:false })).toMatchObject({ reductionDays:5, cashReduction:28.92 })
  })
})
