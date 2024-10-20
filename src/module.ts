import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'
import { configKey, moduleName, nuxtVersion } from './config'

// Module options TypeScript interface definition
export interface ModuleOptions {
    apiKey?: string;
    apiVersion?: string;
    isEnabled?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: moduleName,
        configKey: configKey,
        compatibility: {
            nuxt: nuxtVersion
        },
    },
    // Default configuration options of the Nuxt module
    defaults: {
        isEnabled: true, // Default to enabled
    },
    setup(options:any, nuxt:any) {
        const resolver = createResolver(import.meta.url)

        // Warnings for missing required options
        if (!options.apiKey) {
            return console.warn(`[${moduleName}]: '${configKey}.apiKey' not found!`)
        }

        if (!options.apiVersion) {
            return console.warn(`[${moduleName}]: '${configKey}.apiVersion' not found!`)
        }

        if (!options.isEnabled) {
            return console.warn(`[${moduleName}] module is disabled and will not be loaded.`)
        }

        // Merge runtime config with the module options
        nuxt.options.runtimeConfig.public[configKey] = defu(nuxt.options.runtimeConfig.public[configKey], {
            apiKey: options.apiKey,
            apiVersion: options.apiVersion,
        })

        // Add the plugin
        addPlugin(resolver.resolve('./runtime/plugin'))
    },
})
