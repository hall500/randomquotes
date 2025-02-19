import React from 'react';
import './App.css';

//https://quotes-api-self.vercel.app/quote

class App extends React.Component {
	colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32"];
	
    constructor(props){
		super(props);
		this.state = {
			loaded: false,
			quote: {},
	  color: this.colors[0]
		};
		this.refresh = this.refresh.bind(this);
	}
	
	componentDidMount(){
		this.getQuote();
	}
	
	getQuote(){
		fetch('https://quotes-api-self.vercel.app/quote')
        .then(res => res.json())
        .then((data) => {
		  let num = parseInt(Math.random() * 1000);
		  let colnum = parseInt(Math.random() * this.colors.length);
          this.setState({ 
		  quote: data,
		  loaded: true,
	  color: this.colors[colnum]
		  })
        })
        .catch((err) => console.log('Something went wrong'))
	}
	
	refresh(){
		this.setState({ loaded: false });
		this.getQuote();
	}
	
    render(){
		let quote = this.state.quote;
		let color = this.state.color.toString();
		let tweet = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=` + encodeURIComponent(`"${quote.text}" ${quote.author}`);
		return ( 
		<div className="Container" style={{ backgroundColor : color }}>
		{
			(this.state.loaded) ?
			<blockquote className="Quote" id="quote-box">
			<h3 id="text" style={{ color : color }}><i class="fa fa-quote-left"> </i> { quote.text }</h3>
			<p className="By" id="author"> { quote.author ? ('- ' + quote.author) : '' }</p>
			<div className="btn-group">
				<a id="tweet-quote" className="btn" href={tweet} target="_blank" rel="noopener noreferrer" style={{ backgroundColor : color }}><i class="fa fa-twitter"></i></a>
				<button id="new-quote" className="btn" onClick={this.refresh} style={{ backgroundColor : color }}>Next Quote</button>
			</div>
			</blockquote> :
			<p className="Loading">Loading...</p>
		}
		</div>
		);
	}
}

export default App;
