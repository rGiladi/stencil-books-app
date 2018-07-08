import { Component, Prop, State } from '@stencil/core'
import { Store, Action } from '@stencil/redux'
import { searchBooks } from '../../store/actions/index'

@Component({
  tag: 'search-box'
})
export class SearchBox {

  @Prop({ context: 'store' }) store: Store
  @State() value: string = ''

  searchBooks: Action

  componentWillLoad() {
    const { mapDispatchToProps } = this.store

    mapDispatchToProps(this, {
      searchBooks
    })
  }

  render() {
    const { value} = this

    return (
      <div>
        <input
          placeholder='Search Books...'
          value={value}
          onInput={this.handleChange}
        />
        <button onClick={this.search}>Search</button>
      </div>
    )
  }

  handleChange = e => {
    this.value = e.target.value
  }

  search = () => {
    const value = this.value.trim()

    if (value) {
      this.searchBooks(value)
    } else {
      alert('Please enter at least 1 character')
    }
  }
}
