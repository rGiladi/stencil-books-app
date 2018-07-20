import '@stencil/router'
import { Component, Prop } from '@stencil/core'
import { Store } from '@stencil/redux'
import { configureStore } from '../../store/index'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop({ context: 'store' }) store: Store
  @Prop({ context: 'isServer' }) private isServer: boolean;

  componentWillLoad() {
    let preloadedState = {}

    if (!this.isServer) {
      preloadedState = {
        books: {
          items: JSON.parse(localStorage.getItem('items') || '[]'),
          savedItems: JSON.parse(localStorage.getItem('savedItems') || '[]')
        }
      }
    }

    this.store.setStore(configureStore(preloadedState))
  }

  render() {
    return (
      <stencil-router>
        <stencil-route-link url='/' exact>Home</stencil-route-link>
        <stencil-route-link url='/saved'>My Books</stencil-route-link>

        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url='/' component='app-home' exact />
          <stencil-route url='/saved' component='saved-books' />
        </stencil-route-switch>
      </stencil-router>
    )
  }
}
