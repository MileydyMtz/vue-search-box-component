import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import SearchBox from '../SearchBox.vue'

describe('SearchBox', () => {
    let mockAxios

    beforeEach(() => {
        mockAxios = new MockAdapter(axios)
    })

    afterEach(() => {
        mockAxios.restore()
    })

    it('renders properly', () => {
        const wrapper = mount(SearchBox, { 
            props: { 
            apiUrl: 'http://api.example.com',
            searchField: 'name'
            } 
        })
        expect(wrapper.find('.search-box').exists()).toBe(true)
    })

    it('updates searchQuery when input changes', async () => {
        const wrapper = mount(SearchBox, { 
        props: { 
            apiUrl: 'http://api.example.com',
            searchField: 'name'
        } 
        })

        await wrapper.find('.search-input').setValue('test query')
        expect(wrapper.vm.searchQuery).toBe('test query')
    })

    it('emits loading event when performSearch is called', async () => {
        const wrapper = mount(SearchBox, { 
            props: { 
                apiUrl: 'http://api.example.com',
                searchField: 'name'
            } 
        })

        wrapper.vm.searchQuery = 'test query'
        await wrapper.vm.performSearch()
        expect(wrapper.emitted()).toHaveProperty('loading')
    })


    it('emits results when search is successful', async () => {
        const data = [
        { name: 'test item 1' },
        { name: 'test item 2' },
        { name: 'test item 3' }
        ]

        mockAxios.onGet('http://api.example.com').reply(200, data)

        const wrapper = mount(SearchBox, { 
        props: { 
            apiUrl: 'http://api.example.com',
            searchField: 'name'
        } 
        })

        wrapper.vm.searchQuery = 'test item'
        await wrapper.vm.performSearch()
        expect(wrapper.emitted()).toHaveProperty('results')
        expect(wrapper.emitted().results[0]).toEqual([[{ name: 'test item 1' }, { name: 'test item 2' }, { name: 'test item 3' }]])
    })

    it('emits search-error when search fails', async () => {
        mockAxios.onGet('http://api.example.com').reply(500)

        const wrapper = mount(SearchBox, { 
        props: { 
            apiUrl: 'http://api.example.com',
            searchField: 'name'
        } 
        })

        wrapper.vm.searchQuery = 'test item'
        await wrapper.vm.performSearch()
        expect(wrapper.emitted()).toHaveProperty('search-error')
    })
})
