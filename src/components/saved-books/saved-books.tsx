import { Component, Element, Prop, State, Watch } from '@stencil/core'
import { Store } from '@stencil/redux'

@Component({
  tag: 'saved-books'
})
export class SavedBooks {

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
        items: state.books.savedItems
      }
    })
  }

  render() {
    const { items } = this
    const empty = !items || !items.length

    return (
      <div class={empty ? 'empty' : ''}>
        {empty ? <div>You didn't save any book yet...</div> : null}
        <books-list></books-list>
      </div>
    )
  }
}
