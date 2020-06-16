import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import {setSearchField,requestRobots} from '../action';
import {connect } from 'react-redux';


const mapStateToProps = state =>{
	return {
		searchField:state.searchRobots.searchField,
		robots:state.requestRobots.robots
	}
}
const mapDispatchToProps = (dispatch) => {
	return{
	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	onRequestRobots:()=> dispatch(requestRobots())
}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}


	render() {
		
		const { searchField , onSearchChange , robots , isPending }= this.props;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ?
			<h1>Loading</h1> :
			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={onSearchChange}/>
					<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
					</Scroll>
				</div>
			);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);