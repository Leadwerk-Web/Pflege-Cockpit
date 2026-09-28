import { describe, expect, it } from 'vitest'
import { calculateAssessment, careDegreeFromPoints, combination, respiteCalculation, weighted } from './calculations'

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
  it('maps module intervals', () => {
    expect(weighted('m1', 2)).toBe(2.5)
    expect(weighted('m4', 37)).toBe(40)
  })
})

describe('benefit calculation', () => {
  it('calculates fifty percent combination benefit', () => {
    expect(combination(2, 398, 0).cash).toBe(173.5)
  })
  it('caps benefit use and reports private costs', () => {
    expect(combination(2, 900, 0)).toMatchObject({ cash:0, ownCost:104 })
  })
  it('uses the shared annual respite budget', () => {
    expect(respiteCalculation({ degree:3, relation:'other', fee:2000, travel:0, incomeLoss:0, sharedSpent:1700, days:7, hourly:false })).toMatchObject({ reimbursed:1839, ownCost:161, remaining:0, reductionDays:5 })
  })
})
