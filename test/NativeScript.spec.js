import { shallowMount } from '@vue/test-utils'
import NativeScript from './resources/NativeScript.vue'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import jestVue from '../vue-jest'

const filePath = resolve(__dirname, './resources/NativeScript.vue')
const fileString = readFileSync(filePath, { encoding: 'utf8' })
const conf = {
  globals: {
    'vue-jest': { platform: 'web' }
  }
}

test('processes .vue file with NativeScript tags', () => {
  const wrapper = shallowMount(NativeScript)
  expect(wrapper.text()).toContain('Web')
  expect(wrapper.text()).not.toContain('Native')
})

test('it filters without platform to web', () => {
  const compiled = jestVue.process(fileString, filePath)
  expect(compiled.code).toContain('Web')
  expect(compiled.code).not.toContain('Native')
})

test('it filters with ios platform to native', () => {
  conf.globals['vue-jest'].platform = 'ios'
  const compiled = jestVue.process(fileString, filePath, conf)
  expect(compiled.code).toContain('Native')
  expect(compiled.code).not.toContain('Web')
})

test('it filters with android platform to native', () => {
  conf.globals['vue-jest'].platform = 'android'
  const compiled = jestVue.process(fileString, filePath, conf)
  expect(compiled.code).toContain('Native')
  expect(compiled.code).not.toContain('Web')
})

test('it filters with native platform to native', () => {
  conf.globals['vue-jest'].platform = 'native'
  const compiled = jestVue.process(fileString, filePath, conf)
  expect(compiled.code).toContain('Native')
  expect(compiled.code).not.toContain('Web')
})

test('it filters with web platform to web', () => {
  conf.globals['vue-jest'].platform = 'web'
  const compiled = jestVue.process(fileString, filePath, conf)
  expect(compiled.code).toContain('Web')
  expect(compiled.code).not.toContain('Native')
})

test('it filters with unknown platform to web', () => {
  conf.globals['vue-jest'].platform = 'unknown'
  const compiled = jestVue.process(fileString, filePath, conf)
  expect(compiled.code).toContain('Web')
  expect(compiled.code).not.toContain('Native')
})
