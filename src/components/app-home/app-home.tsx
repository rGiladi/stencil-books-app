import { Component, Element, Prop, State, Watch } from '@stencil/core'
import { Store } from '@stencil/redux'

@Component({
  tag: 'app-home'
})
export class AppHome {

  @Element() el: HTMLElement

  @Prop({ context: 'store' }) store: Store
  @State() items: Array<any>

  @Watch('items')
  updateList() {
    const booksList = this.el.querySelector('books-list')
    booksList.items = this.items
  }

  componentDidLoad() {
    const { mapStateToProps } = this.store

    mapStateToProps(this, state => {
      return {
        items: state.books.items
      }
    })
  }

  render() {
    return (
      <div>
        <search-box></search-box>
        <books-list></books-list>
      </div>
    )
  }
}
