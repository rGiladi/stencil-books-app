import { Component, Element, Prop, State, Watch } from '@stencil/core'
import { Store } from '@stencil/redux'

@Component({
  tag: 'saved-books'
})
export class SavedBooks {

  @Element() el: HTMLElement

  @Prop({ context: 'store' }) store: Store
  @State() books: Array<any>

  @Watch('books')
  updateList() {
    this.el.querySelector('books-list').books = this.books
  }

  componentDidLoad() {
    const { mapStateToProps } = this.store

    mapStateToProps(this, state => {
      return {
        books: state.books.savedItems
      }
    })
  }

  render() {
    const { books } = this
    const empty = !books || !books.length

    return (
      <div class={empty ? 'empty' : ''}>
        {empty ? <div>You didn't save any book yet...</div> : null}
        <books-list></books-list>
      </div>
    )
  }
}
