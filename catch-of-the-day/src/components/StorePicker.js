import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// One ES6 method of binding this to class methods:
	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }
	goToStore(event) {
		event.preventDefault();
		const storeId = this.storeInput.value;
		console.log(`navigating to ${storeId}`)
		// Look at Redirect component of ReactRouter for declarative version
		// first, get the text from the box
		// transition from / to /store/:storeId
		this.context.router.transitionTo(`/store/${storeId}`)
	}

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
			{ /* this.goToStore.bind(this) is equivalent to (e) => this.goToStore(e) */ }
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store name" 
					defaultValue={getFunName()} 
					ref={(input) => {this.storeInput = input}} />
				<button type="submit">Visit Store ➡</button>
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;