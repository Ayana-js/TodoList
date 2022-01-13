import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    isFriend: false
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "" || this.state.isFriend === null) {
      alert("ALl the fields are mandatory!")
      return
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "", isFriend: false });
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div class="ui checkbox">
              <input type="checkbox" 
               name="example" 
               onChange={(e) => this.setState({isFriend: true})} 
               />
              <label>Is this person your friend?</label>
            </div>
         <div> <button className="ui button blue"
                       style={{ marginTop: "15px" }}>Add</button> </div>
        </form>
      </div>
    );
  }
}

export default AddContact;
