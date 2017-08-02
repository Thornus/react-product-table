import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class ProductCategoryRow extends React.Component {
  render() {
    return (<tr><th colSpan="4">{this.props.category}</th></tr>);
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.pieces > 0 ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>$ {this.props.product.price}</td>
        <td>{this.props.product.pieces}</td>
        <td>{this.props.product.delivery}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(this.props.filterText) === -1 || (product.pieces === 0 && this.props.inStockOnly) || product.price < this.props.minPrice || product.price > this.props.maxPrice || (this.props.delivery != 'Both' && product.delivery != this.props.delivery)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Pcs in stock</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    this.handleMinPriceInputChange = this.handleMinPriceInputChange.bind(this);
    this.handleMaxPriceInputChange = this.handleMaxPriceInputChange.bind(this);
    this.handleDeliverySelectChange = this.handleDeliverySelectChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  
  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }
  
  handleMinPriceInputChange(e) {
    this.props.onMinPriceInput(e.target.value);
  }

  handleMaxPriceInputChange(e) {
    this.props.onMaxPriceInput(e.target.value);
  }

  handleDeliverySelectChange(e) {
    this.props.onDeliverySelect(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
        <p>
        Price range between&nbsp;
        <input
          type="text"
          value={this.props.minPrice}
          onChange={this.handleMinPriceInputChange}
        />
        &nbsp;and&nbsp;
        <input
          type="text"
          value={this.props.maxPrice}
          onChange={this.handleMaxPriceInputChange}
        />
        </p>
        <p>
        Delivery:&nbsp;
        <select onChange={this.handleDeliverySelectChange}>
          <option value="Both">Both</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      minPrice: 0,
      maxPrice: 1000,
      delivery: 'Both'
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
    this.handleMinPriceInput = this.handleMinPriceInput.bind(this);
    this.handleMaxPriceInput = this.handleMaxPriceInput.bind(this);
    this.handleDeliverySelect = this.handleDeliverySelect.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  handleMinPriceInput(minPrice) {
    this.setState({
      minPrice: minPrice
    })
  }

  handleMaxPriceInput(maxPrice) {
    this.setState({
      maxPrice: maxPrice
    })
  }

  handleMaxPriceInput(maxPrice) {
    this.setState({
      maxPrice: maxPrice
    })
  }

  handleDeliverySelect(delivery) {
    this.setState({
      delivery: delivery
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          minPrice={this.state.minPrice}
          maxPrice={this.state.maxPrice}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
          onMinPriceInput={this.handleMinPriceInput}
          onMaxPriceInput={this.handleMaxPriceInput}
          onDeliverySelect={this.handleDeliverySelect}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText.toLowerCase()}
          inStockOnly={this.state.inStockOnly}
          minPrice={this.state.minPrice}
          maxPrice={this.state.maxPrice}
          delivery={this.state.delivery}
        />
      </div>
    );
  }
}


var PRODUCTS = [
  {category: 'Sporting Goods', price: 49.99, name: 'Football', pieces: 4, delivery: 'National'},
  {category: 'Sporting Goods', price: 9.99, name: 'Baseball', pieces: 86, delivery: 'National'},
  {category: 'Sporting Goods', price: 29.99, name: 'Basketball', pieces: 0, delivery: 'International'},
  {category: 'Sporting Goods', price: 49.99, name: 'Baseball bat', pieces: 0, delivery: 'National'},
  {category: 'Sporting Goods', price: 49.99, name: 'Hockey stick', pieces: 34, delivery: 'International'},
  {category: 'Electronics', price: 99.99, name: 'iPod Touch', pieces: 3, delivery: 'International'},
  {category: 'Electronics', price: 399.99, name: 'iPhone 5', pieces: 21, delivery: 'International'},
  {category: 'Electronics', price: 199.99, name: 'Nexus 7', pieces: 40, delivery: 'International'},
  {category: 'Electronics', price: 749.00, name: 'iPhone 7', pieces: 0, delivery: 'National'},
  {category: 'Electronics', price: 869.00, name: 'iPhone 7 Plus', pieces: 66, delivery: 'National'},
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
