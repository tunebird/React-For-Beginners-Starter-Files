import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);

		// getinitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		// called just before the rendering occurs
		this.ref = base.syncState(`${this.props.params.storeID}/fishes`,
			{
				context: this,
				state: 'fishes'
			});
		//console.log(this.storeId);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish(fish) {
		// grap a copy of the current state
		const fishes = {...this.state.fishes};
		// add the new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// set the state
		this.setState({ fishes })
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({ order });
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object
							.keys(this.state.fishes)
							.map(key => <Fish key={key} details={this.state.fishes[key]} 
								addToOrder={this.addToOrder} index={key} />)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
}

export default App;