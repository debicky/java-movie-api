import React, {Component} from 'react';
import Hero from "../hero/Hero";

class Home extends Component {
    render() {
        return (
            <div>
                <Hero movies={this.props.movies}></Hero>
            </div>
        );
    }
}

export default Home;