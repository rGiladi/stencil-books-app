import { Component, Prop, State } from '@stencil/core'
import { Store, Action } from '@stencil/redux'
import { saveBook, removeBook } from '../../store/actions/index'

@Component({
  tag: 'books-list'
})
export class BooksList {

  @Prop({ context: 'store' }) store: Store
  @Prop() items: Array<any> = []
  @State() savedItems: Array<any>
  @State() isFetching: boolean
  @State() fetchError: string

  saveBook: Action
  removeBook: Action

  componentWillLoad() {
    const { mapDispatchToProps, mapStateToProps } = this.store

    mapDispatchToProps(this, {
      saveBook,
      removeBook
    })

    mapStateToProps(this, state => {
      const { savedItems, isFetching, fetchError } = state.books

      return {
        savedItems,
        isFetching,
        fetchError
      }
    })
  }

  render() {
    const { items, savedItems, isFetching, fetchError } = this

    return (
      <div>
        {(!isFetching && !fetchError) && (
          <ul>
            {items.map(book => {
              const { previewLink, title, imageLinks, authors } = book.volumeInfo
              const thumbnail = imageLinks ? imageLinks.thumbnail : ''
              const authors_ = authors ? authors.join(', ') : 'Unknown'
              const isSaved = savedItems.find(item => item.id === book.id)

              return (
                <li>
                  <a href={previewLink} target='__blank'>
                    <img class='cover' src={thumbnail} />
                    <div class='info'>
                      <div class='title'>{title}</div>
                      <div class='authors'>{authors_}</div>
                    </div>
                  </a>
                  {isSaved
                    ? <button onClick={() => this.removeBook(book) }>Remove</button>
                    : <button onClick={() => this.saveBook(book)}>Save</button>
                  }
                </li>
              )
            })}
          </ul>
        )}
        {fetchError && <div class='error'>{fetchError}</div>}
        {isFetching && (
          <div class='loader'>
            <div class="lds-ripple"><div></div><div></div></div>
          </div>
        )}
      </div>
    )
  }
}
