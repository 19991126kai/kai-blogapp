# Pin npm packages by running ./bin/importmap

pin 'application'
pin '@hotwired/turbo-rails', to: 'turbo.min.js'
pin '@hotwired/stimulus', to: 'stimulus.min.js'
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin 'trix'
pin '@rails/actiontext', to: 'actiontext.esm.js'
pin 'jquery' # @3.7.1
pin 'axios', to: 'https://cdn.skypack.dev/axios@1.10.0'
pin '@rails/ujs', to: '@rails--ujs.js' # @7.1.3
pin 'articles/show'
