var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function() {
	      this.props.router.on('route', () => {
	      	this.forceUpdate();
	      });
	},
	render: function() {
		var links = [];

		links.push(this.navLink('', 'Home'));

		if(!Parse.User.current()) {
			links.push(this.navLink('register', 'Register'));
			links.push(this.navLink('login', 'Login'));
		} else {
			links.push(this.navLink('dashboard', 'Dashboard'));
			links.push(<li><a href='#' onClick={this.logout}>Logout</a></li>);
		}
		return (
			<div className="nav-wrapper">
				<a href="#" className="brand-logo left">Login Example</a>
				<ul id="nav-mobile" className="right">
					{links}
				</ul>
			</div>
		);
	},
	navLink: function(url, label) {
		var currentURL= Backbone.history.getFragment();
		if(currentURL == url) {
			return(<li className='active'><a href={'#'+url}>{label}</a></li>);
		} else {
			return(<li><a href={'#'+url}>{label}</a></li>);
		}
	},
	logout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('', {trigger: true});
	}
})