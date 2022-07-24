'use strict';

/*
 * Update the page info based on frontmatter data or on the configurated
 * generator.
 */
(function (window) {
  function meta(name, content) {
    if (name === 'description' || name === 'keywords') {
      document.querySelector(`meta[name="${name}"]`).content = content || ''
    } else {
      document.title = content || ''
    }
  }

  function plugin(hook, vm) {
    const refreshInfo = () => {
      const { config, route, frontmatter } = vm
      const { title, description, keywords } = frontmatter || {}
      const entries = { title, description, keywords }

      for (const key in entries) {
        var value = entries[key]

        if (value === undefined) {
          const defaultValue = config.seo?.[key]
          if (typeof defaultValue === 'function') value = defaultValue(route, frontmatter || {})
          else value = defaultValue
        }

        meta(key, value)
      }
    }
    
    hook.init(refreshInfo)
    hook.doneEach(refreshInfo)
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(plugin)
})(this)